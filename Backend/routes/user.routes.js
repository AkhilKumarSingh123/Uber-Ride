
import { Router } from "express";
import { body } from "express-validator";
const router = Router();

import { registerUser, loginUser } from "../controllers/user.controller.js";

router.post('/register',[
  body('email').isEmail().withMessage('Invalid email address'),
  body('fullname.firstname').isLength({ min : 3 }).withMessage('First name should be at least 3 characters long'),
  body('password').isLength({ min : 6 }).withMessage('Password should be at least 6 character long')
],
  registerUser
)


router.post('/login', [
  body('email').isEmail().withMessage('Invalid email address'),
  // body('password').not().isEmpty().withMessage('Password is required')
  body('password').isLength({ min : 6 }).withMessage('Password should be at least 6 character long')
],
  loginUser
)


export default router;