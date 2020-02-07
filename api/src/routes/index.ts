import * as express from 'express'
import {Request, Response} from 'express'
import {getAll, save} from '../database/queries/table'
import {IKnexResponse} from '../database/queries/IKnexResponse'
const router = express.Router()
router.get('/', async (req:Request, res:Response) => {
  try {
    const response: IKnexResponse = await getAll()
    return res.send(response.rows.map((it:any) => it.text))
  } catch (e) {
    return res.status(500).send('Internal error')
  }
})
router.post('/', async (req:Request, res:Response) => {
  const {text} = req.body
  if(!text) {
    return res.status(422).send('Unprocessable Entity')
  }
  try {
    const response: IKnexResponse = await getAll()
    if(response.rows.length > 9) {
      return res.status(403).send('Limit reached')
    }
    await save(text)
    return res.send(true)
  } catch (e) {
    return res.status(500).send('Internal error')
  }
})

export default router
