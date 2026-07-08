# High5 Limo

Monorepo with separate frontend and backend for the public website and admin CMS.

## Structure

```
Limo-App/
├── react/          # Public website (Vite + React)
├── node/           # CMS API (Express + JSON content store)
└── package.json    # Root scripts to run both apps
```

## Run locally

```bash
# Install all dependencies
npm run install:all

# Run React (port 5173) + Node API (port 3001)
npm run dev
```

Or run separately:

```bash
npm run dev:react   # http://localhost:5173
npm run dev:node    # http://localhost:3001
```

## CMS API (Node)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/content` | GET | All site content |
| `/api/content/:section` | GET | One section (e.g. `home`, `site`) |
| `/api/content/:section` | PUT | Update section (admin CMS) |

Content is stored in `node/src/data/content.json`. The React app proxies `/api` to the Node server during development.

## Next step: Admin CMS

- Build admin UI at `/admin` to edit content props
- Wire pages to `useContent()` so changes reflect on the live site
