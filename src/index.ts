import { DataSource } from 'typeorm'
import { User } from './entities/User'
import { Group } from './entities/Group'
import { Topic } from './entities/Topic'
import { Note } from './entities/Note'
import { NoteEdit } from './entities/NoteEdit'

import * as dotenv from 'dotenv'

dotenv.config({ path: 'src/development.env' })

console.log(process.env.USER)

const main = async () => {
  const appDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: parseInt(process.env.PORT as string),
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
    })
    .catch((error) => console.log(error))
}

main()
