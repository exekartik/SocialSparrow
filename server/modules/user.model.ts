import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

/* ===========================================================
   USER INTERFACE

   Purpose:
   Defines the shape of a User document in TypeScript.

   Why?

   Instead of TypeScript guessing types,
   we explicitly tell it what a User looks like.
=========================================================== */

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;

    role: "user" | "admin";

    isVerified: boolean;

    refreshToken: string | null;

    zernioProfileId?: string | null;

    comparePassword(candidatePassword: string): Promise<boolean>;
}

/* ===========================================================
   USER SCHEMA

   This defines how MongoDB stores a user.

   Every document inside the "users" collection
   follows this structure.
=========================================================== */

const userSchema = new mongoose.Schema<IUser>(
    {
        /* -----------------------------------------------------
           User Name
        ----------------------------------------------------- */

        name: {
            type: String,

            required: [true, "Name is required"],

            trim: true,

            minlength: 2,

            maxlength: 50,
        },

        /* -----------------------------------------------------
           Email

           lowercase:
           Converts EMAIL@gmail.com
           into
           email@gmail.com

           unique:
           Prevents duplicate emails.
        ----------------------------------------------------- */

        email: {
            type: String,

            required: [true, "Email is required"],

            unique: true,

            lowercase: true,

            trim: true,
        },

        /* -----------------------------------------------------
           Password

           select:false

           Password is NEVER returned automatically.

           Example

           User.find()

           returns

           {
             name,
             email
           }

           NOT

           password

           During Login

           User.findOne(...)
               .select("+password")
        ----------------------------------------------------- */

        password: {
            type: String,

            required: [true, "Password is required"],

            minlength: 8,

            select: false,
        },

        /* -----------------------------------------------------
           User Role

           Controls authorization.

           Example

           user

           admin
        ----------------------------------------------------- */

        role: {
            type: String,

            enum: ["user", "admin"],

            default: "user",
        },

        /* -----------------------------------------------------
           Email Verification

           false

           ↓

           User has NOT verified email.

           true

           ↓

           Email verified.
        ----------------------------------------------------- */

        isVerified: {
            type: Boolean,

            default: false,
        },

        /* -----------------------------------------------------
           Refresh Token

           IMPORTANT

           We DO NOT store the original refresh token.

           We store only the SHA256 hash.

           If MongoDB gets hacked,

           attacker cannot login.

           Default

           null
        ----------------------------------------------------- */

        refreshToken: {
            type: String,

            default: null,

            select: false,
        },
        
        zernioProfileId: {
            type: String,
            trim: true,
            default: null,
        },
    },

    {
        timestamps: true,
    }
);

/* ===========================================================
   PRE SAVE HOOK

   Runs automatically BEFORE MongoDB saves a document.

   Purpose

   Never save plain text passwords.

   Flow

   User.create()

          ↓

   pre("save")

          ↓

   bcrypt.hash()

          ↓

   MongoDB
=========================================================== */

userSchema.pre("save", async function (next) {

    /*
        If password wasn't modified

        Example

        User updates only name

        Don't hash password again.
    */

    if (!this.isModified("password")) {
        return ;
    }

    /*
        Generate Salt.

        Salt makes password hashes unique
        even if two users have the same password.
    */

    const salt = await bcrypt.genSalt(10);

    /*
        Replace plain password

        abc12345

        with

        $2b$10$.....
    */

    this.password = await bcrypt.hash(this.password, salt);

});

/* ===========================================================
   INSTANCE METHOD  

   comparePassword()

   Purpose

   Compare login password

   with

   hashed password stored inside MongoDB.

   Returns

   true

   false
=========================================================== */

userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {

    return bcrypt.compare(candidatePassword, this.password);

};

/* ===========================================================
   Export User Model

   This model will be used inside

   Auth Service

   Example

   User.find()

   User.create()

   User.findById()
=========================================================== */

export const User: Model<IUser> = mongoose.model<IUser>(
    "User",
    userSchema
);