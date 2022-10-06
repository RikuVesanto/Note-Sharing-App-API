import { Request, Response } from 'express'
import { NoteRegisterRequestDTO } from '../dto/note-register-request.dto'
import noteRepo from '../repositories/note.repository'

export default {
	register: async (req: Request, res: Response) => {
		const registerRequestDTO: NoteRegisterRequestDTO =
			new NoteRegisterRequestDTO()
		try {
			const status = await noteRepo.register(
				Object.assign(registerRequestDTO, req.body)
			)
			if (status == 'topicMissing') {
				res.status(422).send('Failed to create note, missing topic')
			} else if (status == 'created') {
				res.status(201).send('Note created')
			}
		} catch (error: any) {
			console.log(error)
		}
	},
	getNoteList: async (req: Request, res: Response) => {
		try {
			const noteList = await noteRepo.getNoteList(req.params.id)
			res.status(200).send(noteList)
		} catch (error: any) {
			console.log(error)
		}
	},
}
