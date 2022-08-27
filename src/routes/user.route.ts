import { Router } from 'express'
import userController from '../controllers/user.controller'

const router: Router = Router()

router.get('/user', async (req, res) => {
  console.log('request received')
  console.log(req.params)
})

router.post('/register', userController.register)

export default router
