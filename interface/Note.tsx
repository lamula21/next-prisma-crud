import { Note } from '@prisma/client'

// export interface Note {
// 	id: string
// 	title: string
// 	content: string
// 	createdAt: string
// 	updatedAt: string
// }
// use type from prisma instead of making one

// omit type "id" for createNote()
export type CreateNote = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateNote = Partial<CreateNote>
