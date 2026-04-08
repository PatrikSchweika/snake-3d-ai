# Snake 3D

A 3D snake game built on the official Vite `react-ts` scaffold, using React, TypeScript, and Three.js.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`

## GitHub Actions + Vercel

The workflow at `.github/workflows/vercel.yml` runs `lint` and `build` on pull requests and pushes.

On pushes:
- non-`main` branches deploy a Vercel preview
- `main` deploys to Vercel production

Add these GitHub repository secrets before enabling the workflow:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

You can get the Vercel org and project IDs by linking the project locally with `npx vercel link` and then checking `.vercel/project.json`.

## Controls

- `WASD` or arrow keys: move
- `Space`: pause or resume
- `R`: restart
