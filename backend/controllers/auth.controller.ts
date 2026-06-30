import { Request, Response } from "express";
import {
  loginService,
  getMeService,
  updateEmailService,
  changePasswordService,
} from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await loginService(email, password);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      data: user,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Invalid email or password";
    res.status(401).json({ message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Logout failed";
    res.status(500).json({ message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const user = await getMeService(userId);

    res.status(200).json({
      message: "User data retrieved successfully",
      data: user,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to retrieve user data";
    res.status(500).json({ message });
  }
};

export const updateEmail = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { newEmail } = req.body;

    const updatedUser = await updateEmailService(userId, newEmail);

    res.status(200).json({
      message: "Email updated successfully",
      data: updatedUser,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update email";
    res.status(500).json({ message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { oldPassword, newPassword } = req.body;

    await changePasswordService(userId, oldPassword, newPassword);

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to change password";
    res.status(500).json({ message });
  }
};
