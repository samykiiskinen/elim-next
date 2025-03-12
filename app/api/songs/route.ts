import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'

const createSongSchema = z.object ({
    title: z.string().min(1).max(255),
    text: z.string().min(1) 
})

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = createSongSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format, {status: 400})
    const newSong = await prisma.song.create({
        data: {
            title: body.title, text: body.text
        }
    })

    return NextResponse.json(newSong, {status: 201})
}