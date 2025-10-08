### Frontend ↔ Backend connection (Laravel Sanctum, cookies)

1) Create a `.env` file in `vastuvid-frontend` with your backend URL:

```
VITE_API_BASE_URL=http://localhost
# or http://localhost:8000, or your local domain e.g. http://vastuvid.test
```

2) Backend must allow cookies (same-site) and CORS for the frontend origin. In Laravel `.env`:

```
SESSION_DRIVER=cookie
SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:5173,127.0.0.1,127.0.0.1:5173
APP_URL=http://localhost
```

And in `config/cors.php` set `supports_credentials => true` and include your frontend origin in `allowed_origins`.

3) Use the provided `AuthContext` (`src/context/AuthContext.jsx`) which handles:
- CSRF cookie via `/sanctum/csrf-cookie`
- `POST /login`, `POST /logout`, and `GET /api/user`

Wrap your app with `AuthProvider` (already wired in `src/main.jsx`).




installation need for setup :
=============================
npm i -D vite
