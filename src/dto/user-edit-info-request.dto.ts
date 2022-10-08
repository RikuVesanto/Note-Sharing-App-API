import { Allow, IsEmail, Length, IsDefined, IsNotEmpty } from 'class-validator'
import { BaseDTO } from './base-dto'

export class EditUserInfoRequestDTO extends BaseDTO {
	@IsDefined()
	@IsNotEmpty()
	id!: string

	@Allow()
	@Length(4, 32)
	username!: string

	@IsEmail()
	@Allow()
	email!: string

	@Allow()
	name!: string

	@Allow()
	school!: string
}
