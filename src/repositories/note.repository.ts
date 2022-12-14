import { appDataSource } from '../utils/app-data-source'
import { Topic } from '../entities/Topic'
import { Note } from '../entities/Note'
import { NoteRegisterRequestDTO } from '../dto/note-register-request.dto'
import { NoteEditRequestDTO } from '../dto/note-edit-request.dto'
import validate from '../utils/validate-dto'

export default {
	register: async (request: NoteRegisterRequestDTO): Promise<String> => {
		await validate.validateRequest(request)
		if (!request.topicId) {
			return 'topicMissing'
		}
		const note: Note = new Note()
		const topic: Topic = await appDataSource.manager.findOneOrFail(Topic, {
			where: {
				id: request.topicId,
			},
		})
		note.title = request.title
		note.content = request.content ?? ''
		note.topic = topic
		await note.save()
		return 'created'
	},
	getNoteList: async (id: string): Promise<Note[]> => {
		var response: Note[] = await appDataSource
			.getRepository(Note)
			.createQueryBuilder('note')
			.where(`note.topicId = ${id}`)
			.getMany()
		return response
	},
	deleteNote: async (id: string): Promise<String> => {
		await appDataSource
			.createQueryBuilder()
			.delete()
			.from(Note)
			.where('id = :id', { id: id })
			.execute()
		return 'Note deleted'
	},
	editNote: async (request: NoteEditRequestDTO): Promise<String> => {
		await validate.validateRequest(request)
		let note: Note
		try {
			note = await appDataSource.manager.findOneOrFail(Note, {
				where: {
					id: request.noteId,
				},
			})
		} catch (err) {
			return 'Note not found'
		}
		note.content = request.content
		note.title = request.title ?? ''
		note.save()
		return 'Note edited'
	},
}
