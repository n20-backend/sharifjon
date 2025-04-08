import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

import userRouter from "./src/routes/userRoutes.js"
import productsRouter from "./src/routes/productRoutes.js"
import categoriesRouter from "./src/routes/categoriesRoutes.js"

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/users", userRouter)
app.use("/products", productsRouter)
app.use("/categories", categoriesRouter)




const PORT = 4000


app.listen(PORT, () => console.log(`Server:  http://localhost:${PORT}`))



