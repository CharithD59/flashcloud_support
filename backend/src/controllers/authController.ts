import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import {
  getUserByEmail,
  verifyPassword,
  createUser,
} from "../models/userModel";
import dotenv from "dotenv";

dotenv.config();

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await getUserByEmail(email);
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    if (user.status !== "active") {
      return res.status(403).json({ message: "User is inactive" });
    }

    const isMatch = await verifyPassword(user, password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const payload = { id: user.id, email: user.email, roleId: user.roleId };
    const secret = process.env.JWT_SECRET;
    const envExpires = process.env.JWT_EXPIRES_IN;
    const expiresIn: SignOptions["expiresIn"] =
      envExpires && /^\d+$/.test(envExpires)
        ? Number(envExpires)
        : ((envExpires ?? "1h") as SignOptions["expiresIn"]);
    const options: SignOptions = { expiresIn };

    if (!secret) throw new Error("JWT_SECRET is not defined");

    const token = jwt.sign(payload, secret, options);

    // Send response compatible with frontend
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        roleId: user.roleId,
        roleName: user.roleName,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { fname, lname, email, password, roleId, status } = req.body;

    if (!fname || !lname || !email || !password || !roleId || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Create new user
    const newUser = await createUser({
      fname,
      lname,
      email,
      password, // currently plain text, can hash later
      roleId: Number(roleId),
      status,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
        roleId: newUser.roleId,
        status: newUser.status,
      },
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
}
