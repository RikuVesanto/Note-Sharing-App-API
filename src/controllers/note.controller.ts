import { Request, Response } from 'express'
import { NoteRegisterRequestDTO } from '../dto/note-register-request.dto'
import { NoteEditRequestDTO } from '../dto/note-edit-request.dto'
import noteRepo from '../repositories/note.repository'

export default {
	register: async (req: Request, res: Response) => {
		const registerRequestDTO: NoteRegisterRequestDTO =
			new NoteRegisterRequestDTO()
		try {
			const status: String = await noteRepo.register(
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
	deleteNote: async (req: Request, res: Response) => {
		try {
			const status: String = await noteRepo.deleteNote(req.params.id)
			res.status(200).send(status)
		} catch (error: any) {
			console.log(error)
		}
	},
	editNote: async (req: Request, res: Response) => {
		const editNoteDTO: NoteEditRequestDTO = new NoteEditRequestDTO()
		try {
			let status: String = await noteRepo.editNote(
				Object.assign(editNoteDTO, req.body)
			)
			if (status == 'Note not found') {
				res.status(409).send(status)
			} else if (status == 'Note edited') {
				res.status(201).send(status)
			}
		} catch (error: any) {
			console.log(error)
		}
	},
}
