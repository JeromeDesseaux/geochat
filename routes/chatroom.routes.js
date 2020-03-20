import express from 'express';
import ChatroomController from "../controllers/chatroom.controller"
import schemas from "../validators/schemas";
import validate from "../middlewares/validate";
import auth from "../middlewares/auth";

var router = express.Router();

router.get('/', ChatroomController.index)
router.post('/create', [auth, validate(schemas.Chatroom)] ,ChatroomController.create)

export default router;