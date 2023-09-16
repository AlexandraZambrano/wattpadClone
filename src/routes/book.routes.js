import express from "express";
import { getAllBooks, createBook, getBook, updateBook, deleteBook } from "../controllers/books.controller.js";
import verifyToken from "../middlewares/authVerify.js";

const router = express.Router()

router.get('/', getAllBooks)
router.post('/', verifyToken, createBook)
router.get('/:id', getBook)
router.post('/:id', updateBook)
router.delete('/:id', deleteBook)

export default router