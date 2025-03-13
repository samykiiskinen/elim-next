import { songSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest, 
    {params}: {params: Promise<{ id: string }>}) {
        const body = await request.json()
        const validation = songSchema.safeParse(body)
        if (!validation.success) return NextResponse.json(validation.error.errors, {status: 400})
        
        const { id } = await params
        const song = await prisma.song.findUnique({
            where: { id: parseInt(id)}
        })

        if (!song) 
            return NextResponse.json({error: 'Invalid song'}, {status: 404})

        const updatedSong = await prisma.song.update({
            where: {id: song.id},
            data: {
                title: body.title,
                songKey: body.songKey,
                text: body.text
            }
        })

        return NextResponse.json(updatedSong)
    }