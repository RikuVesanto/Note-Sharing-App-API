import argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { appDataSource } from '../utils/app-data-source'
import { User } from '../entities/User'
import { UserRegisterRequestDTO } from '../dto/user-register-request.dto'
import { UserLoginRequestDTO } from 'src/dto/user-login-request.dto'
import { EditUserInfoRequestDTO } from '../dto/user-edit-info-request.dto'
import { EditUserPasswordRequestDTO } from '../dto/user-edit-password-request.dto'
import validate from '../utils/validate-dto'

dotenv.config({ path: '../src/development.env' })

export default {
	register: async (request: UserRegisterRequestDTO): Promise<String> => {
		await validate.validateRequest(request)
		const emailDuplicate = await appDataSource.manager.findOne(User, {
			where: {
				email: request.email,
			},
		})
		if (emailDuplicate != null) {
			return 'duplicateEmail'
		}
		const usernameDuplicate = await appDataSource.manager.findOne(User, {
			where: {
				username: request.username,
			},
		})
		if (usernameDuplicate != null) {
			return 'duplicateUsername'
		}
		const user: User = new User()
		user.username = request.username
		user.password = await argon2.hash(request.password)
		user.email = request.email
		user.name = request.name ?? ''
		await user.save()
		return 'success'
	},
	login: async (request: UserLoginRequestDTO): Promise<String> => {
		let result = ''
		await validate.validateRequest(request)
		let user: User
		try {
			user = await appDataSource.manager.findOneOrFail(User, {
				where: {
					username: request.username,
				},
			})
		} catch (err) {
			return 'Username not found'
		}
		try {
			if (await argon2.verify(user.password, request.password)) {
				result = jwt.sign(
					{ id: user.id, username: user.username },
					String(process.env.JWT_SECRET),
					{ algorithm: 'HS256', expiresIn: '5y' }
				)
			} else {
				// password did not match
				result = 'Incorrect password'
			}
		} catch (err) {
			// internal failure
		}
		return result
	},
	getUser: async (id: number): Promise<Object> => {
		try {
			var user: User = await appDataSource.manager.findOneOrFail(User, {
				where: {
					id: id,
				},
			})
		} catch (err) {
			return 'invalidId'
		}
		return user
	},

	editUserInfo: async (request: EditUserInfoRequestDTO): Promise<String> => {
		await validate.validateRequest(request)
		let user: User
		try {
			user = await appDataSource.manager.findOneOrFail(User, {
				where: {
					id: parseInt(request.id),
				},
			})
		} catch (err) {
			return 'User not found'
		}

		if (request.email) {
			const emailDuplicate = await appDataSource.manager.findOne(User, {
				where: {
					email: request.email,
				},
			})
			if (
				emailDuplicate != null &&
				emailDuplicate.email != request.email
			) {
				return 'duplicateEmail'
			}
			user.email = request.email
		}
		if (request.username) {
			const usernameDuplicate = await appDataSource.manager.findOne(
				User,
				{
					where: {
						username: request.username,
					},
				}
			)
			if (
				usernameDuplicate != null &&
				usernameDuplicate.id != parseInt(request.id)
			) {
				return 'duplicateUsername'
			}
			user.username = request.username
		}
		if (request.username) user.name = request.name
		await user.save()
		return 'success'
	},
	editUserPassword: async (
		request: EditUserPasswordRequestDTO
	): Promise<String> => {
		await validate.validateRequest(request)
		let user: User
		try {
			user = await appDataSource.manager.findOneOrFail(User, {
				where: {
					id: parseInt(request.id),
				},
			})
		} catch (err) {
			return 'User not found'
		}
		if (await argon2.verify(user.password, request.oldPassword)) {
			user.password = await argon2.hash(request.password)
			await user.save()
			return 'Password Changed'
		} else {
			return 'Incorrect Password'
		}
	},
}
