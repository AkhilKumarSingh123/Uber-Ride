
import { Router } from "express";
import { body } from "express-validator";
const router = Router();
// import { registerUser, loginUser, getUserProfile, logoutUser } from "../controllers/user.controller.js";
import { registerCaptain } from "../controllers/captain.controller.js";
// import { authUser } from "../middlewares/auth.middleware.js";

router.post('/register',[
  body('email').isEmail().withMessage('Invalid email address'),
  body('fullname.firstname').isLength({ min : 3 }).withMessage('First name should be at least 3 characters long'),
  body('password').isLength({ min : 6 }).withMessage('Password should be at least 6 character long'),
  body('vehicle.color').isLength({ min : 3 }).withMessage('Color should be at least 3 characters long'),
  body('vehicle.plate').isLength({ min : 3 }).withMessage('Plate should be at least 3 characters long'),
  // body('vehicle.capacity').isLength({ min : 3 }).withMessage('Capacity should be at least 3 characters long'),
  body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1').toInt(),
  body('vehicle.vehicleType').isLength({ min : 3 }).withMessage('Vehicle type should be at least 3 characters long')
],
  registerCaptain
)


export default router;

