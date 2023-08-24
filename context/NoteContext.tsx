'use client'

import { createContext, useState, useContext } from 'react'
import { CreateNote, UpdateNote } from '@/interface/Note'
import { Note } from '@prisma/client' // <- use type from prisma instead of making one

// Typescript
interface childrenProp {
	children: React.ReactNode
}

// To use the states of the Context
// function<...> -> type of inputs
export const NoteContext = createContext<{
	notes: Note[]
	loadNotes: () => Promise<void>
	createNote: (note: CreateNote) => Promise<void>
	deleteNote: (id: number) => Promise<void>
	// editNote: (id: number) => Promise<void>
	selectedNote: Note | null
	setSelectedNote: (note: Note | null) => void
	updateNote: (id: number, note: UpdateNote) => Promise<void>
}>({
	notes: [],
	loadNotes: async () => {},
	createNote: async (note: CreateNote) => {},
	deleteNote: async (id: number) => {},
	// editNote: async (id: number) => {},
	selectedNote: null,
	setSelectedNote: (note: Note | null) => {},
	updateNote: async (id: number, note: UpdateNote) => {},
})

// Issue: callling useContext several times
// Solution: custom hooks
export const useNotes = () => {
	const context = useContext(NoteContext)
	if (!context) {
		throw new Error('useNotes must be used within a NotesProvider')
	}
	return context
}

// To encapsulate components
export const NotesProvider = ({ children }: childrenProp) => {
	const [notes, setNotes] = useState<Note[]>([])
	const [selectedNote, setSelectedNote] = useState<Note | null>(null)

	async function loadNotes() {
		// Calling API in a server-side component
		const res = await fetch('/api/notes')
		const data = await res.json()
		setNotes(data)
	}

	async function createNote(note: CreateNote) {
		const res = await fetch('api/notes', {
			method: 'POST',
			body: JSON.stringify(note),
			headers: {
				'Content-type': 'application/json', // <- Important
			},
		})

		const newNote = await res.json()
		//console.log(data)
		setNotes([...notes, newNote])
	}

	// async function editNote(id: string) {
	// 	const res = await fetch(`http://localhost:3001/api/notes/${id}`, {
	// 		method: 'EDIT',
	// 	})

	// 	const noteEdited = await res.json()

	// }

	async function deleteNote(id: number) {
		const res = await fetch(`http://localhost:3001/api/notes/${id}`, {
			method: 'DELETE',
		})

		const noteDeleted = await res.json()
		setNotes(notes.filter((note) => note.id !== noteDeleted.id))
	}

	async function updateNote(id: number, note: UpdateNote) {
		const res = await fetch(`/api/notes/${id}`, {
			method: 'PUT',
			body: JSON.stringify(note),
			headers: {
				'Content-type': 'application/json',
			},
		})
		const noteEdited = await res.json()
		setNotes(notes.map((note) => (note.id === id ? noteEdited : note)))
	}

	return (
		// Place shar ed states inside "value"
		<NoteContext.Provider
			value={{
				notes,
				loadNotes,
				createNote,
				deleteNote,
				selectedNote,
				setSelectedNote,
				updateNote,
			}}
		>
			{children}
		</NoteContext.Provider>
	)
}
