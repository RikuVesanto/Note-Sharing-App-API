import { Router } from 'express'
import topicController from '../controllers/topic.controller'

const router: Router = Router()

router.post('/topic', topicController.register)
router.get('/topiclist/:id', topicController.getTopicList)

export default router
