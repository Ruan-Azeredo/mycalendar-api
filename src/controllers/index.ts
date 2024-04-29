import { eventRouter } from "./eventsController"
import { tagRouter } from "./tagsController"
import { userRouter } from "./usersController"

const controller = {
    usersController: userRouter,
    tagsController: tagRouter,
    eventController: eventRouter
}

export {controller}