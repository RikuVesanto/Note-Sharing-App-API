import argon2 from 'argon2'
import * as jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
import { appDataSource } from '../utils/app-data-source'
import { User } from '../entities/User'
import { UserRegisterRequestDTO } from '../dto/user-register-request.dto'
import { UserLoginRequestDTO } from 'src/dto/user-login-request.dto'
import validate from '../utils/validate-dto'

dotenv.config({ path: 'src/development.env' })

export default {
  register: async (request: UserRegisterRequestDTO): Promise<String> => {
    await validate.validateRequest(request)
    const emailDuplicate = await appDataSource.manager.findOne(User, {
      where: {
        email: request.email,
      },
    })
    if (emailDuplicate != null) {
      return "duplicateEmail"
    }
    const usernameDuplicate = await appDataSource.manager.findOne(User, {
      where: {
        username: request.username,
      },
    })
    if (usernameDuplicate != null) {
      return "duplicateUsername"
    }
    const user: User = new User()
    user.username = request.username
    user.password = await argon2.hash(request.password)
    console.log(user.password)
    user.email = request.email
    user.name = request.name ?? ''
    user.school = request.school ?? ''
    user.birthday = request.birthday ?? '0001-01-01'
    await user.save()
    return "success"
  },
  login: async (request: UserLoginRequestDTO): Promise<String> => {
    let result = ""
    await validate.validateRequest(request)
    let user: User
    try {
      user = await appDataSource.manager.findOneOrFail(User, {
        where: {
          username: request.username,
        },
      })
    } catch (err) {
      return "Username not found"
    }
    try {
      if ( await argon2.verify(user.password, request.password)) {
        result = jwt.sign(
          { id: user.id, username: user.username },
          String(process.env.JWT_SECRET),
          { algorithm: 'HS256',
          expiresIn: "1h" }
        )
      } else {
        // password did not match
        result = "Incorrect password"
      }
    } catch (err) {
      // internal failure
    }
    return result
  },
}
