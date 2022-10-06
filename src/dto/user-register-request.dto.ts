import { Allow, IsDefined, IsEmail, IsNotEmpty, Length } from 'class-validator'
import { BaseDTO } from './base-dto'

export class UserRegisterRequestDTO extends BaseDTO {
	@IsDefined()
	@IsNotEmpty()
	@Length(4, 32)
	username!: string

	@IsDefined()
	@IsNotEmpty()
	@Length(8, 256)
	password!: string

	@IsEmail()
	@IsDefined()
	@IsNotEmpty()
	email!: string

	@Allow()
	name!: string

	@Allow()
	school!: string

	@Allow()
	birthday!: Date
}
