# Lekki Entertainment

Client-facing website built with Next.js. Deployed to production with automated CI checks and continuous deployment via Vercel.

## Stack
- Next.js
- React
- Tailwind CSS
- GitHub Actions (CI)
- Vercel (hosting & deployment)

## Setup

Clone the repo:

```bash
git clone https://github.com/Ant2023/lekki-entertainment-v2.git
cd lekki-entertainment-v2
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

## CI

Basic CI pipeline using GitHub Actions:

- installs dependencies
- builds the project
- runs tests if present

Triggered on push and pull requests to `main`.

## Deployment

The app is deployed via Vercel.

- pushes to `main` trigger automatic deployments
- environment variables are managed in Vercel

## Notes

- This is a client project, so some configs and data are not included
- CI is intentionally minimal for reliability and fast feedback

## Live

[**LiveWebsite**
](https://lekki-entertainment-v2.vercel.app/)
