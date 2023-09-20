import express from "express";
import { followsUser, unFollowsUser } from "../controllers/follow.controller.js";
import verifyToken from "../middlewares/authVerify.js";
const router = express.Router()

router.post('/follow/:id', verifyToken, followsUser)
router.post('/unfollow/:id', verifyToken, unFollowsUser)

export default router