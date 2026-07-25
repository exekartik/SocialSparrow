# SocialSparrow

SocialSparrow is a React/Vite social-media scheduling application with an Express and MongoDB API.

## Run locally

1. Copy `server/.env.example` to `server/.env` and fill in the required values.
2. Install the client and server dependencies:

   ```powershell
   cd server; npm install
   cd ..\Client; npm install
   ```

3. Start the API in one terminal and the client in another:

   ```powershell
   npm run dev:server
   npm run dev:client
   ```

The client runs at `http://localhost:5173` and the API runs at `http://localhost:3000`.

## Deploy a new Vercel project

Import this repository and leave the included `vercel.json` in place. In Vercel project settings, add these environment variables before deploying:

- `MONGODB_URI`
- `JWT_ACCESS_SECRET` (a long random value)
- `JWT_REFRESH_SECRET` (a different long random value)
- `FRONTEND_URL` (the exact deployed URL, such as `https://your-project.vercel.app`)
- `CRON_SECRET` (a long random value for scheduled publishing)

Add `ZERNIO_API_KEY` to enable social account connections and publishing. Add the three `CLOUDINARY_*` variables only if media uploads are needed, and `GEMINI_API_KEY` only if AI generation is needed.

After the first deployment, update `FRONTEND_URL` to the final Vercel URL and redeploy. If Zernio requires an explicit callback URL, set `ZERNIO_REDIRECT_URI` to `https://your-project.vercel.app/accounts?connected=1`.

## Checks

Run `npm run check` before deploying. It checks the server TypeScript code and builds the production client.
