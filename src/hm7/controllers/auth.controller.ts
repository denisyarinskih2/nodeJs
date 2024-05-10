import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../models";

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, role } = req.body;

    if (!(email && password)) {
      const response = {
        data: null,
        error: {
          message: "All input is required",
        },
      };
      return res.status(400).send(response);
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    const response = {
      data: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      error: null,
    };

    res.status(201).send(response);
  } catch (err) {
    console.error(err);
    const response = {
      data: null,
      error: {
        message: "Internal Server Error",
      },
    };
    res.status(500).send(response);
  }
};

export const signin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const response = {
        data: null,
        error: {
          message: "No user with such email or password",
        },
      };
      return res.status(404).json(response);
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "2h" }
    );
    const response = {
      data: {
        token,
      },
      error: null,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
