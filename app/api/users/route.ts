import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import argon2 from 'argon2'
import { userSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest){
    const body = await request.json()
    const validation = userSchema.safeParse(body)
    console.log("Validation Errors:", validation.error?.errors)

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