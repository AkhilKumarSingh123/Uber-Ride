# Users — Profile Endpoint ✅

## Endpoint

- **GET** `/users/profile`

---

## Description

Fetch the authenticated user's profile. Requires a valid JWT token in the request headers or cookies.

> 🔧 Note: This endpoint is protected by the `authUser` middleware, which verifies the token and attaches the user object to the request.

---

## Request

- **Headers**
  - `Authorization: Bearer <jwt-token>` (or `token` cookie)

---

## Responses

- **200 OK** ✅
  - Body:

```json
{
  "user": {
    "_id": "<userId>",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "socketId": null,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
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
curl -X GET https://your-api.example.com/users/profile \
  -H "Authorization: Bearer <jwt-token>"
```

---

## Implementation notes

- Route defined in `routes/user.routes.js` and handled by `controllers/user.controller.js`.
- Protected by `authUser` middleware in `middlewares/auth.middleware.js`.
