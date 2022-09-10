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
  register: async (request: UserRegisterRequestDTO): Promise<void> => {
    await validate.registerRequest(request)
    const user: User = new User()
    user.username = request.username
    user.password = await argon2.hash(request.password)
    console.log(user.password)
    user.email = request.email
    user.name = request.name ?? ''
    user.school = request.school ?? ''
    user.birthday = request.birthday ?? '0001-01-01'
    await user.save()
  },
  login: async (request: UserLoginRequestDTO): Promise<String> => {
    let token = ""
    await validate.loginRequest(request)
    const user: User = await appDataSource.manager.findOneOrFail(User, {
      where: {
        username: request.username,
      },
    })
    try {
      if ( await argon2.verify(user.password, request.password)) {
        console.log("password matches")
        token = jwt.sign(
          { id: user.id, username: user.username },
          String(process.env.JWT_SECRET),
          { algorithm: 'HS256',
          expiresIn: "1h" }
        )
        console.log(token)
      } else {
        // password did not match
        console.log("password doesn't match")
      }
    } catch (err) {
      // internal failure
    }
    return token
  },
}
