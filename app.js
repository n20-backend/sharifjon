import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
// import userRouter from ".src/routes/userRoutes.js"
import userRouter from "./src/routes/userRoutes.js"

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/users", userRouter)


const PORT = 4000

app.get("/",)

app.listen(PORT, () => console.log(`Server:  http://localhost:${PORT}`))



