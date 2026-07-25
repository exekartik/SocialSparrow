import "dotenv/config";
import connectDB from "../config/Db.js";
import app from "../server.js";
import { User } from "../modules/user.model.js";

async function runE2ETest() {
    console.log("--- STARTING AUTH E2E TEST ---");
    await connectDB();

    const timestamp = Date.now();
    const testEmail = `sparrow_test_${timestamp}@example.com`;
    const testPassword = "SecurePassword123!";
    const testName = "Sparrow Tester";

    const server = app.listen(0, async () => {
        const address = server.address();
        const port = typeof address === "object" && address ? address.port : 0;
        const baseUrl = `http://localhost:${port}/api`;

        console.log(`Test server running at ${baseUrl}`);

        try {
            // 1. Test Signup (/api/auth/register)
            console.log("\n1. Testing Signup POST /api/auth/register...");
            const regRes = await fetch(`${baseUrl}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": "http://localhost:5173"
                },
                body: JSON.stringify({
                    name: testName,
                    email: testEmail,
                    password: testPassword
                })
            });

            console.log("Signup Status:", regRes.status);
            console.log("CORS Access-Control-Allow-Origin:", regRes.headers.get("access-control-allow-origin"));
            const regData = await regRes.json();
            console.log("Signup Response Data:", JSON.stringify(regData, null, 2));

            if (regRes.status !== 201 || !regData.accessToken || !regData.user) {
                throw new Error(`Signup failed with status ${regRes.status}`);
            }

            // 2. Test Duplicate Signup (should return 400 or 409)
            console.log("\n2. Testing Duplicate Signup...");
            const dupRes = await fetch(`${baseUrl}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Origin": "http://127.0.0.1:5173" },
                body: JSON.stringify({ name: testName, email: testEmail, password: testPassword })
            });
            console.log("Duplicate Signup Status:", dupRes.status);
            const dupData = await dupRes.json();
            console.log("Duplicate Response Message:", dupData.message);

            // 3. Test Login (/api/auth/login)
            console.log("\n3. Testing Login POST /api/auth/login...");
            const loginRes = await fetch(`${baseUrl}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Origin": "http://localhost:5173" },
                body: JSON.stringify({ email: testEmail, password: testPassword })
            });

            console.log("Login Status:", loginRes.status);
            console.log("CORS Access-Control-Allow-Origin:", loginRes.headers.get("access-control-allow-origin"));
            const loginData = await loginRes.json();
            console.log("Login Response Data:", JSON.stringify(loginData, null, 2));

            if (loginRes.status !== 200 || !loginData.accessToken) {
                throw new Error(`Login failed with status ${loginRes.status}`);
            }

            // 4. Test Invalid Password Login (should return 401)
            console.log("\n4. Testing Invalid Password Login...");
            const wrongRes = await fetch(`${baseUrl}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: testEmail, password: "WrongPassword123!" })
            });
            console.log("Invalid Login Status:", wrongRes.status);
            const wrongData = await wrongRes.json();
            console.log("Invalid Login Message:", wrongData.message);

            // 5. Test Protected Route (/api/auth/me)
            console.log("\n5. Testing Protected Route GET /api/auth/me with Bearer token...");
            const meRes = await fetch(`${baseUrl}/auth/me`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${loginData.accessToken}`
                }
            });
            console.log("Protected Route Status:", meRes.status);
            const meData = await meRes.json();
            console.log("Protected User Profile:", JSON.stringify(meData.user, null, 2));

            // Clean up test user
            await User.deleteOne({ email: testEmail });
            console.log("\nCleaned up test user.");
            console.log("\n==========================================");
            console.log("SUCCESS: All Authentication E2E Tests Passed!");
            console.log("==========================================");

        } catch (err) {
            console.error("\nTEST ERROR:", err);
        } finally {
            server.close();
            process.exit(0);
        }
    });
}

runE2ETest().catch(e => {
    console.error("Fatal Test Error:", e);
    process.exit(1);
});
