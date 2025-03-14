import { z } from "zod";

export const songSchema = z.object({
    title: z.string().min(1, 'Required').max(255),
    text: z.string().min(1, 'Required'),
    songKey: z.string().min(1, 'Required').max(10)
});

export const userSchema = z.object({
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
    role: z.enum(["ADMIN", "FINANCE", "LEADERSHIP", "SUPPORT", "WORSHIP", "YOUTH"])
});

export const aidProjectSchema = z.object({
    date: z.string(),
    accountNumber: z.preprocess((value) => {
      return typeof value === 'string' ? Number(value) : value;
    }, z.number()),
    accountName: z.string(),
    country: z.string(),
    receiver: z.string(),
    purpose: z.string(),
    decision: z.string().optional(),
    income: z.preprocess((value) => {
      return typeof value === 'string' ? Number(value) : value;
    }, z.number()).optional(),
    expense: z.preprocess((value) => {
      return typeof value === 'string' ? Number(value) : value;
    }, z.number()).optional(),
  });
