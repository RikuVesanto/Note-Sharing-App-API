import { IsDefined, IsNotEmpty, Length } from 'class-validator'
import { BaseDTO } from './base-dto'

export class EditUserPasswordRequestDTO extends BaseDTO {
	@IsDefined()
	@IsNotEmpty()
	@Length(8, 256)
	oldPassword!: string

	@IsDefined()
	@IsNotEmpty()
	@Length(8, 256)
	password!: string

	@IsDefined()
	@IsNotEmpty()
	id!: string
}
