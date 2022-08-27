import { IsDefined, IsNotEmpty, Length } from 'class-validator'
import { BaseDTO } from './base-dto'

export class UserLoginRequestDTO extends BaseDTO {
  @IsDefined()
  @IsNotEmpty()
  @Length(4, 32)
  username!: string

  @IsDefined()
  @IsNotEmpty()
  @Length(8, 256)
  password!: string
}
