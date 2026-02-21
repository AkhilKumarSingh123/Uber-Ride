
import captainModel from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.service.js";

export const registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainExist = await captainModel.findOne({ email });

    if (isCaptainExist) {
      return res.status(400).json({
        message: "Captain with this email already exists"
      });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
      fullname,
      email,
      password: hashedPassword,
      vehicle,
    });

    const token = captain.generateAuthToken();

    captain.password = undefined;

    return res.status(201).json({ token, captain });

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};





// export const loginUser = async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } =  req.body;

//     const user = await userModel.findOne({ email }).select('+password');

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email' });
//     }
//     const isMatch = await user.comparePassword(password);

//     if(!isMatch){
//       return res.status(401).json({ message: 'Invalid password' });
//     }
//     const token = user.generateAuthToken();
//     res.cookie('token', token);

//     res.status(200).json({ token, user });
// }

// export const getUserProfile = async (req, res) => {
//    res.status(200).json({ user: req.user });
// }

// export const logoutUser = async (req, res, next) => {
//     res.clearCookie('token');
//     const token = req.cookies.token || req.headers.authorization.split(" ")[1];

//     await blackListTokenModel.create({ token });

//     res.status(200).json({ message: 'Logged out successfully' });
// }

