import chatroomService from "../services/chatroom.services";

class ChatroomController {

    index(req, res) {
        return res.status(200).json("Salut les jeunes");
    }

    async create(req, res){
        const chatroom = {
            ...req.body,
            admin: req.user.id
        };
        console.log(chatroom);
        const cr = await chatroomService.create(chatroom);
        return res.status(200).json(cr);
    }

}

export default new ChatroomController()