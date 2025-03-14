import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import argon2 from 'argon2'

const schema = z.object({
    name: z.string(),
    password: z.string().min(5)
})

export async function POST(request: NextRequest){
    const body = await request.json()
    const validation = schema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })
    const user = await prisma.user.findUnique({
        where: { email: body.email }
    })
    if (user)
        return NextResponse.json({ error: "Användaren är redan registrerad"},
    { status: 400 })

    const hashedPassword = await argon2.hash(body.password)
    const newUser = await prisma.user.create({
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            role: body.role,
            hashedPassword
        }
    })
    return NextResponse.json({ email: newUser.email})
}