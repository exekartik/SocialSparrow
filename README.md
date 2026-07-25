# 🐦 SocialSparrow

<div align="center">

![SocialSparrow Banner](https://img.shields.io/badge/SocialSparrow-AI%20Powered%20Scheduler-ff6b00?style=for-the-badge&logo=twitter&logoColor=white)

**An Enterprise-Grade, AI-Powered Social Media Management & Automated Post Scheduling Platform.**

[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react)](https://react.dev/)
[![Express.js](https://img.shields.io/badge/Express.js-5.0-000000.svg?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg?logo=mongodb)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000.svg?logo=vercel)](https://vercel.com/)

[Live Demo](https://social-sparrow-one.vercel.app/) • [Report Bug](https://github.com/exekartik/SocialSparrow/issues) • [Request Feature](https://github.com/exekartik/SocialSparrow/issues)

</div>

---

## 🌟 Overview

**SocialSparrow** is a full-featured, modern social media automation ecosystem that empowers creators, marketers, and teams to compose, schedule, and publish posts across multiple platforms seamlessly. Built with a high-end dark graphite UI aesthetic, dynamic micro-animations, and AI generation powered by Google Gemini, SocialSparrow delivers an effortless user experience for content creators.

---

## ✨ Key Features

- **🚀 Targeted Multi-Platform Post Scheduler**
  - Compose once and distribute across Twitter/X, LinkedIn, Facebook, and Instagram.
  - Drag-and-drop media file uploads supported by Cloudinary CDN integration.
  - Live 280-character counter, date/time pickers, and multi-select target toggles.
- **🤖 AI Composer (Powered by Google Gemini)**
  - Instantly convert post topic ideas into polished, platform-ready captions.
  - Custom tone selector (Professional, Casual, Witty, Hype, Educational).
  - One-click transfer from AI Preview to Post Scheduler queue.
- **📊 Real-Time Activity & Analytics Dashboard**
  - Interactive metric counters for Scheduled Posts, Published Events, and Connected Accounts.
  - Live activity feed documenting recent publication statuses and timestamps.
- **🔗 Connected Accounts Management**
  - Seamless social platform connections powered by Zernio integration.
  - Account status toggles, avatar sync, and single-click disconnect workflows.
- **🔒 Enterprise-Grade Security & Authentication**
  - JWT dual-token architecture (Short-lived Access Tokens + SHA256 hashed Refresh Tokens).
  - Pre-save Mongoose bcrypt password hashing and strict input validation.
  - Serverless-optimized Mongoose connection pooling & lazy initialization.
- **🎨 Premium Dark Aesthetics & Micro-Animations**
  - Electric orange highlights (`#ff6b00`) paired with sleek dark graphite plates (`#121214`).
  - WebGL `SpecularButton` hover shine effects, meteor particles, and responsive drawer navigation.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 + TypeScript + Vite 8 |
| **Styling & Motion** | TailwindCSS 4 + Lucide Icons + Motion (Framer Motion) |
| **Backend API** | Express.js 5 + Node.js + TypeScript |
| **Database** | MongoDB Atlas + Mongoose ODM |
| **AI Engine** | Google Gemini Generative AI SDK (`@google/genai`) |
| **Social Media Integration** | Zernio Social API (`@zernio/node`) |
| **Media Hosting** | Cloudinary CDN |
| **Deployment & Hosting** | Vercel (Serverless Functions + Frontend Hosting) |

---

## 📁 Repository Structure

```
SocialSparrow/
├── Client/                      # React 19 Frontend Application
│   ├── src/
│   │   ├── api/                 # Axios configuration & interceptors
│   │   ├── components/          # Reusable UI components & animations
│   │   ├── context/             # Auth & Global State providers
│   │   ├── pages/               # Application page routes
│   │   └── App.tsx              # Main routing & layout configuration
│   ├── index.html
│   └── package.json
├── server/                      # Express.js API Backend
│   ├── config/                  # DB, Cloudinary & Zernio configurations
│   ├── controllers/             # Auth, Post, Account & AI Controllers
│   ├── middleware/              # Auth verification & error middleware
│   ├── modules/                 # Mongoose schemas & TypeScript interfaces
│   ├── routes/                  # Express route definitions
│   ├── services/                # Background Scheduler Service
│   └── server.ts                # Express app entry point
├── api/                         # Vercel Serverless Gateway
│   └── index.ts                 # Handler forwarding to Express app
├── vercel.json                  # Vercel deployment & rewrite configuration
└── package.json                 # Monorepo root configuration
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **MongoDB**: Local instance or MongoDB Atlas Connection URI

### 1. Clone the Repository
```bash
git clone https://github.com/exekartik/SocialSparrow.git
cd SocialSparrow
```

### 2. Configure Environment Variables
Copy `.env.example` templates to `.env` files in both the `server/` and `Client/` directories:

**Server Environment (`server/.env`)**:
```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/socialsparrow
JWT_ACCESS_SECRET=your_super_secret_access_key_123
JWT_REFRESH_SECRET=your_super_secret_refresh_key_123
JWT_ACCESS_EXPIRES=7d
JWT_REFRESH_EXPIRES=7d
COOKIE_EXPIRES=7
FRONTEND_URL=http://localhost:5173

# Optional Integrations
ZERNIO_API_KEY=your_zernio_api_key
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Client Environment (`Client/.env`)**:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 3. Install Dependencies & Start Local Servers

Install dependencies for both client and server:
```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../Client
npm install
cd ..
```

Start the Server and Client concurrently:
```bash
# Terminal 1: Backend API (runs at http://localhost:3000)
npm run dev:server

# Terminal 2: Frontend Client (runs at http://localhost:5173)
npm run dev:client
```

---

## ⚡ Deployment to Vercel

SocialSparrow is fully optimized out-of-the-box for **Vercel Serverless Deployment**.

1. **Push your code to GitHub.**
2. **Import the repository into Vercel.**
3. **Environment Setup**: Paste the keys from `server/.env` into the Vercel Project **Environment Variables** panel.
4. **Deploy**: Vercel reads `vercel.json` and automatically builds both the frontend bundle and serverless API endpoints!

---

## 🔒 API Endpoint Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT tokens | ❌ |
| `GET` | `/api/accounts` | Get list of connected social accounts | ✅ |
| `POST` | `/api/accounts/connect` | Connect a new social platform account | ✅ |
| `DELETE` | `/api/accounts/:id` | Disconnect a social account | ✅ |
| `GET` | `/api/posts` | Fetch scheduled & published posts | ✅ |
| `POST` | `/api/posts` | Create and schedule a new post | ✅ |
| `POST` | `/api/posts/generate` | Generate AI post caption with Gemini | ✅ |
| `GET` | `/api/activity` | Get user activity history logs | ✅ |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/exekartik/SocialSparrow/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ by Kartik and the SocialSparrow Team.</sub>
</div>
