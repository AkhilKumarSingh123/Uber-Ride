

import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";

export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    console.log(req.body);


    if (!fullname || !fullname.firstname || !fullname.lastname) {
      return res.status(400).json({ message: "Full name is required" });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    return res.status(201).json({ token, user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};


export const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } =  req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = user.generateAuthToken();
    res.status(200).json({ token, user });
}