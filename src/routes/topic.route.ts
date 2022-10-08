import { Router } from 'express'
import topicController from '../controllers/topic.controller'
import { authenticate } from '../middleware/authenticate'

const router: Router = Router()

router.post('/topic', authenticate, topicController.register)
router.get('/topiclist/:id', authenticate, topicController.getTopicList)

export default router
