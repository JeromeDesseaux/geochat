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
router.get('/getmine', [auth], ChatroomController.getMyChatrooms)
router.get('/requests', [auth], ChatroomController.getMyRequests)
router.get('/closest', [auth], ChatroomController.getClosest)
// router.get('/name/:name',ChatroomController.getClosest)
router.get('/:id', [auth], ChatroomController.getChatroom)
router.delete('/:id', [auth], ChatroomController.deleteChatroom)

export default router;