import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      message: "Email, password and name are required",
    });
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    return res.status(400).json({
      message: "Registration failed",
      error: error.message,
    });
  }

  const user = data.user;

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: user.id,
    nome: name,
    email,
  });

  if (profileError) {
    return res.status(400).json({
      message: "User created but profile creation failed",
      error: profileError.message,
    });
  }

  return res.status(201).json({
    message: "User registered successfully",
    user,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({
      message: "Login failed",
      error: error.message,
    });
  }

  return res.status(200).json({
    message: "Login successful",
    session: data.session,
    user: data.user,
  });
};

export const me = async (_req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Authenticated user',
    user: res.locals.user,
  });
};