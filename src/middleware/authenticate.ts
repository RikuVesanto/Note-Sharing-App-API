import { Request, Response } from 'express'
import { Secret, verify } from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { error } from '../utils/error'

dotenv.config({ path: '../src/development.env' })

/**
 * Middleware used to authenticate request using the "authorization" header
 * @param req Request object
 * @param res Response object
 * @param next Next function - passes control to the next middleware in the stack
 * @returns If token is valid token, passes control to the next middleware in the stack, otherwise returns an error
 */
const authenticate = async (req: Request, res: Response, next: Function) => {
	const token = req.headers.authorization

	if (!token) {
		return res.status(401).send('Missing token')
	}

	const secret: Secret = process.env.JWT_SECRET ?? ''
	if (secret.length === 0) {
		throw error(500, 'Missing secret')
	}
	try {
		verify(token, secret)
		return next()
	} catch (error) {
		return res.status(401).send('Invalid token')
	}
}

export { authenticate }
