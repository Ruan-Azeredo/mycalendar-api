import { Router,  Response, Request } from "express";
import User from "../models/User";

const userRouter = Router()

// depreacated, after delete this route, I will not need this
userRouter.get('/all', async (req: Request, resp: Response) => {
    const users = await User.getAll()
    return resp.json(users)
})

userRouter.get('/:id', async (req: Request, res: Response) => {

    const {id} = req.params

    const user = await User.getById(id)

    return res.json(user)
})

userRouter.post('', async (req: Request, res: Response) => {

    const { name, email, password } = req.body

    const user = await User.create({
        name: name, email: email, password: password,
    })
    return res.json(user)
})

userRouter.put('/:id', async (req: Request, res: Response) => {

    const {id} = req.params
    const { name, email, password } = req.body

    const user = await User.update({
        id: id, name: name, email: email, password: password,
    })
    return res.json(user)
})

export {userRouter}