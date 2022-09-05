import argon2 from 'argon2'
<<<<<<< HEAD
import { appDataSource } from '../utils/app-data-source'
import { User } from '../entities/User'
import { UserRegisterRequestDTO } from '../dto/user-register-request.dto'
import { UserLoginRequestDTO } from 'src/dto/user-login-request.dto'
=======
import { User } from '../entities/User'
import { UserRegisterRequestDTO } from '../dto/user-register-request.dto'
>>>>>>> 8aa3e5d26f028681229298b46f6232e26a19ca99
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
  login: async (request: UserLoginRequestDTO): Promise<void> => {
    await validate.loginRequest(request)
    const user: User = await appDataSource.manager.findOneOrFail(User, {
      where: {
        username: request.username,
      },
    })
    try {
      if (await argon2.verify(request.password, user.password)) {
        // password match
      } else {
        // password did not match
      }
    } catch (err) {
      // internal failure
    }
  },
}
