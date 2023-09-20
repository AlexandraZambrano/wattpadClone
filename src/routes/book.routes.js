import express from "express";
import { getAllBooks, createBook, getBook, updateBook, deleteBook, getUserBooks, likeBook } from "../controllers/books.controller.js";
import verifyToken from "../middlewares/authVerify.js";
import {verifyAdminRole, verifyRole} from "../middlewares/authRoles.js";
import { commentChapter, createChapterForBook, likeChapter } from "../controllers/chapters.controller.js";

const router = express.Router()

router.get('/', getAllBooks)
router.get('/:id', getBook)
router.get('/library/mybooks', verifyToken, getUserBooks)


router.post('/', verifyToken, verifyAdminRole, createBook)
router.post('/:id/chapter', verifyToken, createChapterForBook)

router.post('/library/:id/like', verifyToken, verifyRole, likeChapter)

router.post('/:id/like', verifyToken, likeBook);
router.post('/:chapterId/comments', verifyToken, commentChapter)


router.put('/:id', verifyToken, updateBook)
router.delete('/:id',verifyToken, deleteBook)

export default router