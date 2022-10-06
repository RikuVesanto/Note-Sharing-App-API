import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { appDataSource } from './utils/app-data-source'
import routes from './routes'

dotenv.config({ path: 'src/development.env' })
const main = async () => {
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
