import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import { User } from '../entities/User'
import { Group } from '../entities/Group'
import { Topic } from '../entities/Topic'
import { Note } from '../entities/Note'

dotenv.config({ path: 'src/development.env' })

export const appDataSource = new DataSource({
	type: 'postgres',
	host: process.env.HOST,
	port: parseInt(process.env.DB_PORT as string),
	username: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DB,
	entities: [User, Group, Topic, Note],
	synchronize: true,
	logging: false,
})
