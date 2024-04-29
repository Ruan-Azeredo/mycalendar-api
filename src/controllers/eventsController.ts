import { Request, Response, Router } from "express";
import Event from "../models/Event";

const eventRouter = Router()

//maybe depreadated
eventRouter.get('/all', async (req: Request, resp: Response) => {
    const events = await Event.getAll()
    return resp.json(events)
})

eventRouter.post('', async (req: Request, res: Response) => {

    const { user_id, tag_id, name, description, done, startTime, finishTime } = req.body

    const event = await Event.create({
        user_id: user_id, tag_id: tag_id, name: name, description: description, done: done, startTime: startTime, finishTime: finishTime
    })
    return res.json(event)
})

eventRouter.get('/filteredevents', async (req: Request, res: Response) => {

    const { name, tagId, startTime, finishTime } = req.query

    console.log(tagId)

    const event = await Event.getFilteredEvents({
        tag_id_array: tagId, name: name, startTime: startTime, finishTime: finishTime
    })
    return res.json(event)
})

eventRouter.put('/:id', async (req: Request, res: Response) => {

    const { id } = req.params
    const { user_id, tag_id, name, description, done, startTime, finishTime } = req.body

    const event = await Event.update({
        id: id, user_id: user_id, tag_id: tag_id, name: name, description: description, done: done, startTime: startTime, finishTime: finishTime
    })
    return res.json(event)
})

eventRouter.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params

    const event = await Event.delete(id)
})

export {eventRouter}