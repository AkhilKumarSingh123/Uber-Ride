# Users — Login Endpoint ✅

## Endpoint

- **POST** `/users/login`

---

## Description

Authenticate an existing user. Accepts an email and password and returns a signed **JWT token** and the authenticated **user** object on success.

> 🔧 Note: The controller fetches the user with `select('+password')`, compares the provided password using bcrypt, and returns a JWT signed with `process.env.JWT_SECRET`.

---

## Request

- **Headers**
  - `Content-Type: application/json`

- **Body (JSON)**

```json
{
  "email": "john@example.com",
  "password": "strongpassword"
}
```

---

## Validation rules

- `email` — must be a valid email (checked with `express-validator`).
- `password` — required, minimum length **6** (validated with `express-validator`).

If validation fails, the endpoint returns a **400** with an `errors` array from `express-validator`.

---

## Responses

- **200 OK** ✅
  - Body:

```json
{
  "token": "<jwt-token>",
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

- **400 Bad Request** ⚠️
  - Validation errors:

```json
{
  "errors": [
    /* express-validator errors */
  ]
}
```

- **401 Unauthorized** ⚠️
  - Invalid email:

```json
{ "message": "Invalid email" }
```

- Invalid password:

```json
{ "message": "Invalid password" }
```

- **500 Internal Server Error** ⚠️
  - Body:

```json
{ "message": "<error message>" }
```

---

## Example cURL

```bash
curl -X POST https://your-api.example.com/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "strongpassword"
  }'
```

---

## Implementation notes

- Route defined in `routes/user.routes.js` and handled by `controllers/user.controller.js`.
- Controller fetches user with `userModel.findOne({ email }).select('+password')` and verifies with `user.comparePassword(password)`.
- Token generation uses `user.generateAuthToken()` from the model.
