import { connectDB } from "./db.js"
import cors from 'cors'
import express from "express"
import 'dotenv/config'

import bookRoutes from './routes/book.routes.js'
import authRoutes from './routes/auth.routes.js'
import followRoutes from './routes/follow.routes.js'

connectDB()

const app = express();

app.use(cors())
app.use(express.json())
app.use('/books', bookRoutes)
app.use('/auth', authRoutes)
app.use('/user', followRoutes)

app.listen(8000)
console.log("server on port", 8000)