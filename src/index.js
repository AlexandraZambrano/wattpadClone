import { connectDB } from "./db.js"
import cors from 'cors'
import express from "express"
import 'dotenv/config'

const app = express();


import bookRoutes from './routes/book.routes.js'
import authRoutes from './routes/auth.routes.js'



app.use(cors())
app.use(express.json())
app.use('/books', bookRoutes)
app.use('/auth', authRoutes)
connectDB()

app.listen(8000)
console.log("server on port", 8000)