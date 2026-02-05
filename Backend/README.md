# Backend API — Users Register Endpoint ✅

## POST /users/register

Registers a new user and returns a JWT token and the created user object.

---

## Request

- Headers:
  - `Content-Type: application/json`

- Body (JSON):

```json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com",
  "password": "strongpassword"
}
```

---

## Validation / Required fields

- `fullname.firstname` — required, minimum length 3 (validated with `express-validator`).
- `fullname.lastname` — required, minimum length 3 (schema validation).
- `email` — required, valid email format.
- `password` — required, minimum length 6.

If validation fails the endpoint responds with **400 Bad Request** and an `errors` array from `express-validator`.

---

## Responses

- 201 Created ✅
  - Body: `{ "token": "<jwt>", "user": { ... } }`
- 400 Bad Request ⚠️
  - Validation errors or missing data: `{ "errors": [...] }` or `{ "message": "Full name is required" }`
- 500 Internal Server Error ⚠️
  - `{ "message": "<error message>" }`

---

## Notes

- Passwords are hashed (`bcrypt`) before saving and the token is signed with `process.env.JWT_SECRET`.
- Route: `routes/user.routes.js` → Controller: `controllers/user.controller.js` → Service: `services/user.service.js` → Model: `models/user.model.js`.

---

## Example cURL

```bash
curl -X POST http://localhost:5000/users/register \
  -H "Content-Type: application/json" \
  -d '{ "fullname": {"firstname":"John","lastname":"Doe"}, "email":"john@example.com", "password":"strongpassword" }'
```

---

If you want I can add automated tests or a Postman example for this endpoint. 💡
