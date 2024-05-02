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
    try {
        const event = await Event.create({
            user_id: user_id, tag_id: tag_id, name: name, description: description, done: done, startTime: startTime, finishTime: finishTime
        })
        const message = 'Evento Criado'
        return res.status(200).json({message, event: event})
    } catch (error) {
        console.error("Erro ao criar evento:", error);
        return res.status(500).json({ message: 'Ocorreu um erro ao criar o evento', error: (error as Error).message }); 
    }
})

eventRouter.get('/filteredevents', async (req: Request, res: Response) => {

    const { user_id, name, tagId, startTime, finishTime } = req.query
    try {
        const events = await Event.getFilteredEvents({
            user_id: user_id, tag_id_array: tagId, name: name, startTime: startTime, finishTime: finishTime
        })
        const message = 'Eventos Filtrados'
        return res.status(200).json({message, events: events})
    } catch (error) {
        console.error("Erro ao filtrar evento:", error);
        return res.status(500).json({ message: 'Ocorreu um erro ao filtrar o evento', error: (error as Error).message });
    }
})

eventRouter.put('/:id', async (req: Request, res: Response) => {

    const { id } = req.params
    const { user_id, tag_id, name, description, done, startTime, finishTime } = req.body
    try {
        const event = await Event.update({
            id: id, user_id: user_id, tag_id: tag_id, name: name, description: description, done: done, startTime: startTime, finishTime: finishTime
        })
        const message = 'Evento Atualizado'
        return res.status(200).json({message, event: event})
    } catch (error) {
        return res.status(500).json({ message: 'Ocorreu um erro ao atualizar o evento', error: (error as Error).message }); 
    }
})

eventRouter.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const event = await Event.delete(id)
        const message = 'Evento Deletado'
        return res.status(200).json({message, event: event})
    } catch (error) {
        return res.status(500).json({ message: 'Ocorreu um erro ao deletar o evento', error: (error as Error).message });
    }
})

export {eventRouter}