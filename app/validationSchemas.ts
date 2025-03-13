import { z } from "zod";

export const songSchema = z.object({
    title: z.string().min(1, 'Required').max(255),
    text: z.string().min(1, 'Required'),
    songKey: z.string().min(1, 'Required').max(10)
});
