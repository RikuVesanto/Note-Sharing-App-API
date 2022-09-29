import { Router } from 'express'
import noteController from '../controllers/note.controller'

const router: Router = Router()

router.post('/note', noteController.register)
router.get('/notelist/:id', noteController.getNoteList)

export default router
