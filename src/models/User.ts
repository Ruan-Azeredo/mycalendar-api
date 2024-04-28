import { prismaClient } from "../database/prismaClient"
const crypto = require("crypto")

interface User{
    id?: string
    name: string
    email: string
    password: string
    created_at?: Date
    updated_at?: Date
}

class User {

    static encriptPassword(password: string){
        const cipher = crypto.createCipher("aes256", process.env.CRIPTO_KEY)
        cipher.update(password)
        const encryptedPassword = cipher.final("hex")

        return encryptedPassword
    }

    static decriptPassword(password: string){
        const decipher = crypto.createDecipher("aes256", process.env.CRIPTO_KEY)
        let decryptedPassword = decipher.update(password, "hex", "utf8")
        decryptedPassword += decipher.final("utf8")
    }

    static async create(params: User) {

        const { name, email, password } = params

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: this.encriptPassword(password)
            }
        })
        return user
    }

    static async update(params: User){
        const { id, name, email, password } = params

        const user = await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                name: name,
                email: email,
                password: this.encriptPassword(password)
            }
        })
        return user
    }

    static async getById(id: string){
        const user = await prismaClient.user.findUnique({
            where: {
                id: id
            }
        })
        return user
    }

    // depreacated, after delete this static method, I will not need this
    static async getAll(){
        const users = await prismaClient.user.findMany()

        return users
    }

}

export default User