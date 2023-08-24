'use client'

import { useState, useRef, useEffect } from 'react'
//import { NoteContext } from '@/context/NoteContext'
import { useNotes } from '@/context/NoteContext'

export function NoteForm() {
	// Retrieve data from Form in Client component
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const titleRef = useRef(null)

	// Issue: callling useContext several times
	// Solution: custom hooks
	const { createNote, selectedNote, setSelectedNote, updateNote } = useNotes()
	useEffect(() => {
		if (selectedNote) {
			setTitle(selectedNote.title)
			setContent(selectedNote.content || '')
		}
	}, [selectedNote])
	return (
		// Handle POST in a form
		<form
			onSubmit={async (e) => {
				e.preventDefault() // stop refreshing page when submitted

				if (selectedNote) {
					await updateNote(selectedNote.id, {
						title,
						content,
					})
					setSelectedNote(null)
				} else {
					await createNote({ content, title })
				}

				setTitle('')
				setContent('')

				titleRef.current?.focus()

				// Issue: when added new data, we need to refresh page to see changes
				// Solution: useContext to save data and share in all components
				// MIGRATED TO NOTECONTEXT.TSX
				// const res = await fetch('api/notes', {
				// 	method: 'POST',
				// 	body: JSON.stringify({ title, content }),
				// 	headers: {
				// 		'Content-type': 'application/json', // <- Important
				// 	},
				// })

				// const data = await res.json()
				// //console.log(data)
			}}
		>
			<input
				className="w-full px-5 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
				type="text"
				autoFocus
				placeholder="Title"
				onChange={(e) => setTitle(e.target.value)}
				value={title} // <- when rendered, display title state
				ref={titleRef}
			/>
			<textarea
				className="w-full px-5 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
				type="text"
				placeholder="Content"
				onChange={(e) => setContent(e.target.value)}
				value={content} // <- when rendered, display content state
			/>

			<div className="flex justify-end gap-2">
				<button
					className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500"
					type="submit"
				>
					{selectedNote ? 'Update' : 'Create'}
				</button>

				{selectedNote && (
					<button
						className="px-5 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700"
						onClick={() => {
							setSelectedNote(null)
							setTitle('')
							setContent('')
						}}
					>
						Cancel
					</button>
				)}
			</div>
		</form>
	)
}
