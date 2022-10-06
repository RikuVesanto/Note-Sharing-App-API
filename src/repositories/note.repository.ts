import { appDataSource } from '../utils/app-data-source'
import { Topic } from '../entities/Topic'
import { Note } from '../entities/Note'
import { NoteRegisterRequestDTO } from '../dto/note-register-request.dto'
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
	getNoteList: async (id: string): Promise<Object> => {
		var response = await appDataSource
			.getRepository(Note)
			.createQueryBuilder('note')
			.where(`note.topicId = ${id}`)
			.getMany()
		return response
	},
}
