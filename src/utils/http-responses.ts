import { Response } from 'express'

export default {
  ok: (res: Response) => {
    return res.sendStatus(200)
  },
  created: (res: Response) => {
    return res.sendStatus(201)
  },
}
