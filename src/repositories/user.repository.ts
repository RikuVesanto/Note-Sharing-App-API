import argon2 from 'argon2'
import { User } from '../entities/User'
import { UserRegisterRequestDTO } from '../dto/user-register-request.dto'
import validate from '../utils/validate-dto'

export default {
  register: async (request: UserRegisterRequestDTO): Promise<void> => {
    await validate.registerRequest(request)
    const user: User = new User()
    user.username = request.username
    user.password = await argon2.hash(request.password)
    user.email = request.email
    user.name = request.name ?? ''
    user.school = request.school ?? ''
    user.birthday = request.birthday ?? '0001-01-01'
    await user.save()
  },
}
