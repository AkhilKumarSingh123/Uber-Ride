# Users — Logout Endpoint ✅

## Endpoint

- **GET** `/users/logout`

---

## Description

Log out the authenticated user by clearing the token cookie and blacklisting the token.

> 🔧 Note: This endpoint is protected by the `authUser` middleware, which verifies the token before proceeding.

---

## Request

- **Headers**
  - `Authorization: Bearer <jwt-token>` (or `token` cookie)

---

## Responses

- **200 OK** ✅
  - Body:

```json
{ "message": "Logged out successfully" }
```

- **401 Unauthorized** ⚠️
  - Missing or invalid token:

```json
{ "message": "Access denied. No token provided." }
```

- Blacklisted token:

```json
{ "message": "Token is blacklisted. Please log in again." }
```

- Invalid token:

```json
{ "message": "Invalid token." }
```

---

## Example cURL

```bash
curl -X GET https://your-api.example.com/users/logout \
  -H "Authorization: Bearer <jwt-token>"
```

---

## Implementation notes

- Route defined in `routes/user.routes.js` and handled by `controllers/user.controller.js`.
- Protected by `authUser` middleware in `middlewares/auth.middleware.js`.
- Blacklists the token by saving it in `blackListTokenModel`.
