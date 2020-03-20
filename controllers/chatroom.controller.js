import chatroomService from "../services/chatroom.services";
import {getLocationFromIP} from "../utils/iplookup";

class ChatroomController {

    index(req, res) {
        return res.status(200).json("Salut les jeunes");
    }

    async create(req, res){
        let chatroom = {
            ...req.body,
            admin: req.user.id
        };
        if(!chatroom.location){
            chatroom = {
                ...chatroom,
                location: {
                    type: "Point",
                    coordinates: getLocationFromIP(req.ipInfo.ip)
                }
            }
        }
        console.log(chatroom);
        const cr = await chatroomService.create(chatroom);
        return res.status(200).json(cr);
    }

}

export default new ChatroomController()