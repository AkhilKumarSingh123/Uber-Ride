# Backend API — Captains Register Endpoint ✅

## POST /captains/register

Registers a new captain and returns the created captain object.

---

## Request

- Headers:
  - `Content-Type: application/json`

- Body (JSON):

```json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com",
  "password": "strongpassword",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "Sedan"
  }
}
```

---

## Validation / Required fields

- `fullname.firstname` — required, minimum length 3.
- `fullname.lastname` — required.
- `email` — required, valid email format.
- `password` — required, minimum length 6.
- `vehicle.color` — required, minimum length 3.
- `vehicle.plate` — required, minimum length 3.
- `vehicle.capacity` — required, must be an integer greater than or equal to 1.
- `vehicle.vehicleType` — required, minimum length 3.

If validation fails, the endpoint responds with **400 Bad Request** and an `errors` array from `express-validator`.

---

## Responses

- **201 Created** ✅
  - Body: `{ "captain": { ... } }`
- **400 Bad Request** ⚠️
  - Validation errors or missing data: `{ "errors": [...] }`
- **500 Internal Server Error** ⚠️
  - `{ "message": "<error message>" }`

---

## Notes

- Passwords are hashed (`bcrypt`) before saving.
- Route: `routes/captain.routes.js` → Controller: `controllers/captain.controller.js` → Service: `services/captain.service.js` → Model: `models/captain.model.js`.

---

## Example cURL

```bash
curl -X POST http://localhost:5000/captains/register \
  -H "Content-Type: application/json" \
  -d '{ "fullname": {"firstname":"John","lastname":"Doe"}, "email":"john@example.com", "password":"strongpassword", "vehicle": {"color":"Red", "plate":"XYZ123", "capacity":4, "vehicleType":"Sedan"} }'
```