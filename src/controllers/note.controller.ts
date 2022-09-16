import { Request, Response } from 'express'
import respond from '../utils/http-responses'
import { NoteRegisterRequestDTO } from '../dto/note-register-request.dto'
import noteRepo from '../repositories/note.repository'

export default {
  register: async (req: Request, res: Response) => {
    const registerRequestDTO: NoteRegisterRequestDTO =
      new NoteRegisterRequestDTO()
    try {
      await noteRepo.register(Object.assign(registerRequestDTO, req.body))
      respond.created(res)
    } catch (error: any) {
      console.log(error)
    }
  },
  getNoteList: async (req: Request, res: Response) => {
    try {
      const noteList = await noteRepo.getNoteList(req.params.id)
      res.send(noteList)
    } catch (error: any) {
      console.log(error)
    }
  },
}
