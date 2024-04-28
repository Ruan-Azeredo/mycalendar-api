import { tagRouter } from "./tagsController"
import { userRouter } from "./usersController"

const controller = {
    usersController: userRouter,
    tagsController: tagRouter
}

export {controller}