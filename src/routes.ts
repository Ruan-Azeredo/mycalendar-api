import { Router } from "express";

import { controller } from './controllers/index';

const router = Router()

router.use("/user", controller.usersController)

export {router}