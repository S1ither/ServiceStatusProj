import {Router} from "express"
const route = Router()

import {GET} from "../controllers/home.controller"

route.get("/:page", GET)

export default route