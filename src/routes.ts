import { Router } from "express";

import { controller } from './controllers/index';

const router = Router()

router.use("/user", controller.usersController)
router.use("/tag", controller.tagsController)

export {router}