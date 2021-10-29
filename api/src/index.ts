import express, { json } from "express"
import cors from "cors"

import { router } from "./routes"


const app = express()

app.use(cors())
app.use(router)



app.listen(4000, () => console.log("Server is running!! ☺"))
