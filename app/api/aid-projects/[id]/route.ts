import { aidProjectSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }>}) {
        const { id } = await params;
        const body = await request.json()
        const validation = aidProjectSchema.safeParse(body)
        if (!validation.success)
            return NextResponse.json(validation.error.format(), { status: 400 })

        const project = await prisma.aidProject.findUnique({
            where: { id: parseInt(id)}
        })
        if (!project) 
            return NextResponse.json({error: 'Invalid project'}, { status: 404})

        const updatedProject = await prisma.aidProject.update({
            where: { id: project.id },
            data: {
                date: body.date,
                accountNumber: body.accountNumber,
                accountName: body.accountName,
                country: body.country,
                receiver: body.receiver,
                purpose: body.purpose,
                decision: body.decision,
                income: body.income,
                expense: body.expense,
            }
        })

        return NextResponse.json(updatedProject)
    }

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }>}) {
        const { id } = await params;
        const aidProject = await prisma.aidProject.findUnique({
            where: { id: parseInt(id)}
        })
        if (!aidProject) 
            return NextResponse.json({error: 'Invalid song'}, { status: 404})

        await prisma.aidProject.delete({
            where: { id: aidProject.id }
        })

        return NextResponse.json({})
    }