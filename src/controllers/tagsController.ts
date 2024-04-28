import { Request, Response, Router } from "express";
import Tag from "../models/Tag";

const tagRouter = Router()

tagRouter.get('/all', async (req: Request, resp: Response) => {
    const tags = await Tag.getAll()
    return resp.json(tags)
})

tagRouter.post('', async (req: Request, res: Response) => {

    const { user_id, name, color } = req.body

    const tag = await Tag.create({
        user_id: user_id, name: name, color: color,
    })
    return res.json(tag)
})

tagRouter.put('/:id', async (req: Request, res: Response) => {

    const {id} = req.params
    const { user_id, name, color } = req.body

    const tag = await Tag.update({
        id: id, user_id: user_id,name: name, color: color
    })
    return res.json(tag)
})

tagRouter.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params

    const tag = await Tag.delete(id)
})

export {tagRouter}