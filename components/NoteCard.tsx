import { Note } from '@prisma/client'
import { useNotes } from '@/context/NoteContext'
export function NoteCard({ note }: { note: Note }) {
	const { deleteNote, setSelectedNote } = useNotes()

	return (
		<div
			key={note.id}
			className="bg-slate-500 p-4 my-2 flex justify-between items-center"
		>
			<div>
				<h1 className="text-2xl font-bold">{note.title}</h1>
				<p>{note.content}</p>
			</div>

			<div className="flex gap-x-2">
				<button onClick={async () => await deleteNote(Number(note.id))}>
					Delete
				</button>

				<button onClick={() => setSelectedNote(note)}>Edit</button>
			</div>
		</div>
	)
}
