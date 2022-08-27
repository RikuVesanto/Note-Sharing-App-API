import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import { User } from './entities/User'
import { Group } from './entities/Group'
import { Topic } from './entities/Topic'
import { Note } from './entities/Note'
import { NoteEdit } from './entities/NoteEdit'
import routes from './routes'

dotenv.config({ path: 'src/development.env' })

console.log(process.env.USER)

const main = async () => {
  const appDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    entities: [User, Group, Topic, Note, NoteEdit],
    synchronize: true,
    logging: false,
  })

  appDataSource
    .initialize()
    .then(() => {
      console.log('connection successful')
      const app = express()

      app.use(cors())

      app.use(express.json())

      app.use('/', routes)

      app.listen(process.env.EXPRESS_PORT, () => {
        console.log(
          `[server]: Server is running at https://localhost:${process.env.EXPRESS_PORT}`
        )
      })
    })
    .catch((error) => console.log(error))
}

main()
