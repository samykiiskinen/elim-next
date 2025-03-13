import { z } from "zod";

export const songSchema = z.object({
    title: z.string().min(1, 'Required').max(255),
    text: z.string().min(1, 'Required'),
    songKey: z.string().min(1, 'Required').max(10)
});

export const userSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
    role: z.enum(["ADMIN", "FINANCE", "LEADERSHIP", "SUPPORT", "WORSHIP", "YOUTH"])
});
