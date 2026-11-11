# CampusCode

CampusCode is a client-rendered React app built with Vite. Repository analysis and RAG responses in this UI are sample demonstrations; no live repository analysis is performed.

## Development

```bash
npm install
npm run dev
```

## Build and preview

```bash
npm run type-check
npm run build
npm run preview
```

The production bundle is written to `dist/`.

## Static hosting

Configure the host to serve `index.html` for unknown paths. This SPA fallback is required for direct visits and refreshes on `/product`, `/dashboard`, and `/playground`.
