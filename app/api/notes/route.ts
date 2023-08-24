// REST API: Backend Code that returns JSON to a front-end

import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

export async function GET() {
	try {
		// What if Request fails
		//throw new Error('Not Implemented')

		// "note" table name
		const notes = await prisma.note.findMany()

		return NextResponse.json(notes)
	} catch (error) {
		if (error instanceof Error)
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

// Typescript -> "Request" is an global object of js
export async function POST(request: Request) {
	try {
		const { title, content } = await request.json()

		// Creating a document with prisma
		// Takes an object with
		// - data: the data of the document to be created
		// - select
		const newNote = await prisma.note.create({
			data: {
				title: title,
				content: content,
			},
		})

		return NextResponse.json(newNote)
	} catch (error) {
		if (error instanceof Error)
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
