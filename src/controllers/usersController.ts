import { Router,  Response, Request } from "express";
import { prismaClient } from "../database/prismaClient";
import User from "../models/User";

const router = Router()

// depreacated, after delete this route, I will not need this
router.get('/all', async (req: Request, resp: Response) => {
    const users = await User.getAll()
    return resp.json(users)
})

router.get('/:id', async (req: Request, res: Response) => {

    const {id} = req.params

    const user = await User.getById(id)

    return res.json(user)
})

router.post('', async (req: Request, res: Response) => {

    const {name, email, password } = req.body

    const user = await User.create({
        name: name, email: email, password: password,
    })
    return res.json(user)
})

export {router}