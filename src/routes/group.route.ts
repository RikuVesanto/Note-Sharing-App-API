import { Router } from 'express'
import groupController from '../controllers/group.controller'
import { authenticate } from '../middleware/authenticate'

const router: Router = Router()

router.post('/group', authenticate, groupController.register)
router.put('/group', authenticate, groupController.editGroup)
router.post('/userconnection', authenticate, groupController.addUserConnection)
router.get(
	'/group/creator/:groupId/:userId',
	authenticate,
	groupController.getCreator
)
router.get('/userlist/:id', authenticate, groupController.getUserList)
router.get('/grouplist/:id', authenticate, groupController.getGroupList)
router.get(
	'/searchlist/:search',
	authenticate,
	groupController.getGroupSearchResult
)
router.delete(
	'/userconnection/:groupId/:userId',
	authenticate,
	groupController.deleteUserConnection
)
router.put('/creator', authenticate, groupController.editCreator)

export default router
