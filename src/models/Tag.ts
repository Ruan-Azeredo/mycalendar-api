import { prismaClient } from "../database/prismaClient"

interface Tag {
    id?: string
    user_id: string
    name: string
    color: string
    created_at?: Date
    updated_at?: Date
}

class Tag {

    static async create(params: Tag){
        const { user_id, name, color } = params

        const tag = await prismaClient.tag.create({
            data: {
                user_id: user_id,
                name: name,
                color: color
            }
        })
        return tag
    }

    static async update(params: Tag){
        const { id, user_id, name, color } = params

        const tag =  await prismaClient.tag.update({
            where: {
                id: id
            },
            data: {
                user_id: user_id,
                name: name,
                color: color
            }
        })
        return tag
    }

    static async getAll(){
        const tags = await prismaClient.tag.findMany()

        return tags
    }

    static async delete(id: string){
        const tag = await prismaClient.tag.delete({
            where: {
                id: id
            }
        })
        return tag
    }

}

export default Tag