import { Response } from 'express'

const jsonResponse = (res: Response, code: number, message: any) => {
  return res.status(code).json(message)
}

export default {
  ok: (res: Response, message: any) => {
    if (!!message) {
      return jsonResponse(res, 200, message)
    } else {
      return res.sendStatus(200)
    }
  },
  created: (res: Response) => {
    return res.sendStatus(201)
  },
}
