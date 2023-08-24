'use client' // since we are using context

import { NoteCard } from '@/components/NoteCard'
import { NoteForm } from '@/components/NoteForm'
import { useNotes } from '@/context/NoteContext'

// Context to encapsulate components and share states
import { useEffect, useContext } from 'react'
// import { NoteContext } from '@/context/NoteContext' <- replaced by customHook useNotes()

// REWRITED IN NOTECONTET.TSX
// async function loadNote() {
// 	// Calling API in a server-side component
// 	const res = await fetch('http://localhost:3001/api/notes')
// 	const data = await res.json()
// 	return data
// }

export default function HomePage() {
	// const notes = await loadNote()
	const { notes, loadNotes } = useNotes()

	useEffect(() => {
		loadNotes()
	}, [])

	return (
		<div className="flex items-center justify-center h-screen">
			<div>
				<NoteForm />
				<div>
					{notes.map((note) => (
						<NoteCard note={note} key={note.id} />
					))}
				</div>
			</div>
		</div>
	)
}
