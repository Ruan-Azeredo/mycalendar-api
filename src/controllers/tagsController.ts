import { Request, Response, Router } from "express";
import Tag from "../models/Tag";

const router = Router()

router.get('/all', async (req: Request, resp: Response) => {
    const tags = await Tag.getAll()
    return resp.json(tags)
})

router.post('', async (req: Request, res: Response) => {

    const { user_id, name, color } = req.body

    const tag = await Tag.create({
        user_id: user_id, name: name, color: color,
    })
    return res.json(tag)
})

router.put('/:id', async (req: Request, res: Response) => {

    const {id} = req.params
    const { user_id, name, color } = req.body

    const tag = await Tag.update({
        id: id, user_id: user_id,name: name, color: color
    })
    return res.json(tag)
})

router.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params

    const tag = await Tag.delete(id)
})

export {router}