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
    }

    static async update(params: Event){
        const { id, user_id, tag_id, name, description, done, startTime, finishTime } = params

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
    }

    //maybe depreadated
    static async getAll(){
        const events = await prismaClient.event.findMany()

        return events
    }

    static async getFilteredEvents(infos: any){
        const { tag_id_array, name, startTime, finishTime } = infos

        const events = await prismaClient.event.findMany({
            where: {
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
        return events
    }


    static async delete(id: string){
        const events = await prismaClient.event.delete({
            where: {
                id: id
            }
        })
        return events
    }

}

export default Event