import { Allow, IsDefined, IsNotEmpty, Length } from 'class-validator'
import { BaseDTO } from './base-dto'

export class NoteEditRequestDTO extends BaseDTO {
	@Allow()
	@Length(1, 48)
	title!: string

	@IsNotEmpty()
	@IsDefined()
	content!: string

	@IsNotEmpty()
	@IsDefined()
	noteId!: number
}
