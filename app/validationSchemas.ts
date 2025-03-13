import { z } from "zod";

export const createSongSchema = z.object({
    title: z.string().min(1, 'Title required').max(255),
    text: z.string().min(1, 'Text required')
});
