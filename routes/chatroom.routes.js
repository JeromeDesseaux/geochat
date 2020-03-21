import express from 'express';
import ChatroomController from "../controllers/chatroom.controller"
import schemas from "../validators/schemas";
import validate from "../middlewares/validate";
import auth from "../middlewares/auth";

var router = express.Router();
router.post('/create', [auth, validate(schemas.Chatroom)] ,ChatroomController.create)
router.post('/request/:id', [auth, validate(schemas.ChatroomRequest)] ,ChatroomController.sendRequest)
router.delete('/request/:id', [auth] ,ChatroomController.removeRequest)
router.put('/request/:id', [auth, validate(schemas.ValidateChatroomRequest)] ,ChatroomController.validateRequest)
router.get('/closest',ChatroomController.getClosest)
// router.get('/name/:name',ChatroomController.getClosest)
router.get('/:id', ChatroomController.getChatroom)

export default router;