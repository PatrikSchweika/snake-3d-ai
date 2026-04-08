# Snake 3D

A 3D snake game built on the official Vite `react-ts` scaffold, using React, TypeScript, and Three.js.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`

## Music Configuration

Background music is loaded from `VITE_THEME_MUSIC_URL`.

Local development:
- create `.env.local`
- set `VITE_THEME_MUSIC_URL=https://your-public-music-url`

GitHub Actions:
- add `VITE_THEME_MUSIC_URL` as a GitHub Actions variable or secret
- the workflow injects it into `npm run build`, so the built `dist` artifact already contains the music URL before deployment

## GitHub Actions + Vercel

The workflow at `.github/workflows/vercel.yml` runs `lint` and `build` on pull requests and pushes.

GitHub Actions now builds the app and uploads the generated `dist` folder as an artifact. Deploy jobs convert that artifact into Vercel Build Output API static output and upload it with `vercel deploy --prebuilt`, so Vercel is no longer responsible for building the app.

On pushes:
- non-`main` branches deploy a Vercel preview
- `main` deploys to Vercel production

Add these GitHub repository secrets before enabling the workflow:

- `VITE_THEME_MUSIC_URL` as either a repository variable or secret
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

You can get the Vercel org and project IDs by linking the project locally with `npx vercel link` and then checking `.vercel/project.json`.

## Controls

- `WASD` or arrow keys: move
- `Space`: pause or resume
- `R`: restart
