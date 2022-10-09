import { Router } from 'express'
import noteController from '../controllers/note.controller'
import { authenticate } from '../middleware/authenticate'

const router: Router = Router()

router.post('/note', authenticate, noteController.register)
router.get('/notelist/:id', authenticate, noteController.getNoteList)
router.delete('/note/:id', authenticate, noteController.deleteNote)

export default router
