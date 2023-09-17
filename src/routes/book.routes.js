import express from "express";
import { getAllBooks, createBook, getBook, updateBook, deleteBook, getUserBooks } from "../controllers/books.controller.js";
import verifyToken from "../middlewares/authVerify.js";
import {verifyAdminRole, verifyRole} from "../middlewares/authRoles.js";
import { createChapterForBook } from "../controllers/chapters.controller.js";

const router = express.Router()

router.get('/', getAllBooks)
router.get('/:id', getBook)
router.get('/library/:userId', verifyToken, getUserBooks)
router.post('/', verifyToken, verifyAdminRole, createBook)
router.post('/:id/chapter', verifyToken, createChapterForBook)
router.put('/:id', verifyToken, updateBook)
router.delete('/:id',verifyToken, deleteBook)

export default router