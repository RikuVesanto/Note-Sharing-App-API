import { Request, Response } from 'express'
import { UserRegisterRequestDTO } from '../dto/user-register-request.dto'
import { UserLoginRequestDTO } from '../dto/user-login-request.dto'
import { EditUserInfoRequestDTO } from '../dto/user-edit-info-request.dto'
import { EditUserPasswordRequestDTO } from '../dto/user-edit-password-request.dto'
import userRepo from '../repositories/user.repository'

export default {
	register: async (req: Request, res: Response) => {
		const registerRequestDTO: UserRegisterRequestDTO =
			new UserRegisterRequestDTO()
		try {
			let status: String = await userRepo.register(
				Object.assign(registerRequestDTO, req.body)
			)
			if (status == 'duplicateEmail') {
				res.status(409).send('This email is already in use')
			} else if (status == 'duplicateUsername') {
				res.status(409).send('This username is already in use')
			} else if (status == 'success') {
				res.status(201).send('Registration successful')
			}
		} catch (error: any) {
			console.log(error)
		}
	},
	login: async (req: Request, res: Response) => {
		const LoginRequestDTO: UserLoginRequestDTO = new UserLoginRequestDTO()
		try {
			const response: String = await userRepo.login(
				Object.assign(LoginRequestDTO, req.params)
			)
			if (
				response == 'Incorrect password' ||
				response == 'Username not found'
			) {
				res.status(401).send({
					message: response,
				})
			} else if (response != '') {
				res.status(200).send(response)
			}
		} catch (error: any) {
			console.log(error)
		}
	},
	getUser: async (req: Request, res: Response) => {
		try {
			const response = await userRepo.getUser(parseInt(req.params.id))
			if (response == 'Username not found') {
				res.status(401).send({
					message: response,
				})
			} else if (response != '') {
				res.status(200).send(response)
			}
		} catch (error: any) {
			console.log(error)
		}
	},
	editUserInfo: async (req: Request, res: Response) => {
		const editUserInfoDTO: EditUserInfoRequestDTO =
			new EditUserInfoRequestDTO()
		try {
			let status: String = await userRepo.editUserInfo(
				Object.assign(editUserInfoDTO, req.body)
			)
			if (status == 'missingId') {
				res.status(401).send('User not found')
			} else if (status == 'duplicateEmail') {
				res.status(409).send('This email is already in use')
			} else if (status == 'duplicateUsername') {
				res.status(409).send('This username is already in use')
			} else if (status == 'success') {
				res.status(201).send('User info changed')
			}
		} catch (error: any) {
			console.log(error)
		}
	},
	editUserPassword: async (req: Request, res: Response) => {
		const editUserPasswordDTO: EditUserPasswordRequestDTO =
			new EditUserPasswordRequestDTO()
		try {
			let status: String = await userRepo.editUserPassword(
				Object.assign(editUserPasswordDTO, req.body)
			)
			if (status == 'User not found') {
				res.status(401).send(status)
			} else if (status == 'Incorrect Password') {
				res.status(422).send(status)
			} else if (status == 'Password Changed') {
				res.status(201).send(status)
			}
		} catch (error: any) {
			console.log(error)
		}
	},
}
