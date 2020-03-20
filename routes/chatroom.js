import express from 'express';
import ChatroomController from "../controllers/chatroom.controller"
var router = express.Router();

router.get('/', ChatroomController.index)

export default router;