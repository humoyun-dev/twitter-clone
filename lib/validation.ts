import * as z from "zod";

export const RegisterStepOneSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
});

export const RegisterStepTwoSchema = z.object({
  password: z.string().min(6),
  username: z.string().min(3),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  bio: z.string().min(3),
  location: z.string().min(3),
});