import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { Prisma } from '@prisma/client' // Get Prisma Types

interface Params {
	params: { id: string }
}

export async function GET(request: Request, { params }: Params) {
	//console.log(params.id)

	const note = await prisma.note.findFirst({
		where: {
			id: Number(params.id),
		},
	})

	if (!note)
		return NextResponse.json(
			{
				message: 'GET: Note not found',
			},
			{ status: 404 }
		)

	return NextResponse.json(note)
}

export async function DELETE(request: Request, { params }: Params) {
	try {
		const deleteNote = await prisma.note.delete({
			where: {
				id: Number(params.id),
			},
		})

		if (!deleteNote)
			return NextResponse.json({ message: 'Note not found' }, { status: 404 })

		// -> can return a Toast Message

		return NextResponse.json({
			...deleteNote,
			message: 'Note deleted succesfully',
		})
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				return NextResponse.json(
					{
						message: 'DELETE: Note not found',
					},
					{
						status: 403,
					}
				)
			}

			return NextResponse.json(
				{
					message: error.message,
				},
				{
					status: 500,
				}
			)
		}
	}
}

export async function PUT(request: Request, { params }: Params) {
	try {
		// Express: const {...} = req.body
		const { title, content } = await request.json()

		const updatedNote = await prisma.note.update({
			data: {
				title,
				content,
			},
			where: {
				id: Number(params.id),
			},
		})

		// -> can return a Toast Message

		return NextResponse.json(updatedNote)
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2025')
				return NextResponse.json(
					{
						message: 'PUT: Note not found',
					},
					{
						status: 404,
					}
				)

			return NextResponse.json(
				{
					message: error.message,
				},
				{
					status: 500,
				}
			)
		}
	}
}
