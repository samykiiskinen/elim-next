import { userSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }>}) {
        const { id } = await params;
        const body = await request.json()
        const validation = userSchema.safeParse(body)
        if (!validation.success)
            return NextResponse.json(validation.error.format(), { status: 400 })

        const user = await prisma.user.findUnique({
            where: { id: (id)}
        })
        if (!user) 
            return NextResponse.json({error: 'Invalid user'}, { status: 404})

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                email: body.email,
                name: body.name,
                role: body.role
            }
        })

        return NextResponse.json(updatedUser)
    }

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }>}) {
        const { id } = await params;
        const user = await prisma.user.findUnique({
            where: { id: (id)}
        })
        if (!user) 
            return NextResponse.json({error: 'Invalid user'}, { status: 404})

        await prisma.user.delete({
            where: { id: user.id }
        })

        return NextResponse.json({})
    }
