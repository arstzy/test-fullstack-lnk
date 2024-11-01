import { Request, RequestHandler, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtUtils";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const register: RequestHandler = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error, "error register");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    user.loginTimeStamps = new Date();
    await user.save();

    const token = generateToken(user._id as string, user.email);

    res.status(200).json({
      message: "Login success",
      data: {
        token,
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.log(error, "error login");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.logoutTimeStamps = new Date();
    await user.save();

    res.status(200).json({ message: "Logout success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
