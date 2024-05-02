import { prismaClient } from "../database/prismaClient"

interface Event{
    id?: string
    user_id: string
    tag_id?: string
    name: string
    description: string
    done: boolean
    startTime?: number
    finishTime?: number
    created_at?: Date
    updated_at?: Date
}

class Event {

    static async create(params: Event){
        const { user_id, tag_id, name, description, done, startTime, finishTime } = params
        try {
            const event = await prismaClient.event.create({
                data: {
                    user_id: user_id,
                    tag_id: tag_id,
                    name: name,
                    description: description,
                    done: done,
                    startTime: startTime,
                    finishTime: finishTime
                }
            })
            return event
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    static async update(params: Event){
        const { id, user_id, tag_id, name, description, done, startTime, finishTime } = params
        try {
            const event =  await prismaClient.event.update({
                where: {
                    id: id
                },
                data: {
                    user_id: user_id,
                    tag_id: tag_id,
                    name: name,
                    description: description,
                    done: done,
                    startTime: startTime,
                    finishTime: finishTime
                }
            })
            return event
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    //maybe depreadated
    static async getAll(){
        const events = await prismaClient.event.findMany()

        return events
    }

    static async getFilteredEvents(infos: any){
        const { user_id, tag_id_array, name, startTime, finishTime } = infos
        try {
            const events = await prismaClient.event.findMany({
                where: {
                    user_id: {
                        equals: user_id
                    },
                    name: {
                        contains: name as string
                    },
                    tag_id: {
                        in: tag_id_array as []
                    },
                    startTime: {
                        gte: startTime as number
                    },
                    finishTime: {
                        lte: finishTime as number
                    }
                }
            })
            events.sort((a, b) => {
                const createdAt_a = a.created_at ? a.created_at.getTime() : Number.MAX_SAFE_INTEGER
                const createdAt_b = b.created_at ? b.created_at.getTime() : Number.MAX_SAFE_INTEGER
                
                return createdAt_a - createdAt_b
              });
            return events
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }


    static async delete(id: string){
        try {
            const events = await prismaClient.event.delete({
                where: {
                    id: id
                }
            })
            return events
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

}

export default Event