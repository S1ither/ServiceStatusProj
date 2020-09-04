import {Router} from "express"
const route = Router()

import {GET} from "../controllers/home.controller"

route.get("/", GET)

export default route