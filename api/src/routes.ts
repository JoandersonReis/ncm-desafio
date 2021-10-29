import { Router } from "express"
import { AtribbutesController } from "./controllers/AttributesController"


const router = Router()

router.get("/attributes/ncm/:page", new AtribbutesController().handle)


export { router }
