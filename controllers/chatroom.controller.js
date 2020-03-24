import chatroomService from "../services/chatroom.services";
import {getLocationFromIP} from "../utils/iplookup";

class ChatroomController {

    async getChatroom(req, res) {
        const chatroom = await chatroomService.get(req.params.id);
        if(chatroom) {
            return res.status(200).json(chatroom);
        }
        return res.status(404).json({error: "NOT_FOUND"});
    }

    async getByName(req, res) {
        const chatroom = await chatroomService.getByName(req.params.name);
        if (chatroom) {
            return res.status(200).json(chatroom);
        }
        return res.status(404).json({
            error: "NOT_FOUND"
        });
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
        try {
            const cr = await chatroomService.create(chatroom);
            return res.status(200).json(cr);
        } catch (error) {
            return res.status(409).json(error);
        }
    }

    async sendRequest(req, res) {
        var id = req.params.id
        var message = req.body.message;
        var userId = req.user.id;
        try {
            if(message) {
                const chatroom = await chatroomService.sendRequest(id, userId, message);
                return res.status(200).json(chatroom);
            }
            return res.status(500).json("Impossible");
        } catch (error) {
            return res.status(409).json(error);
        }
    }

    async removeRequest(req, res) {
        var id = req.params.id
        var userId = req.user.id;

        try {
            const chatroom = await chatroomService.removeRequest(id, userId);
            return res.status(200).json(chatroom);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async validateRequest(req,res){
        var id = req.params.id
        var userId = req.user.id;
        const status = req.body.status || null;
        const requestId = req.body.request || null;

        try {
            const chatroom = await chatroomService.validateRequest(id, userId, requestId, status);
            if(!chatroom) {
                return res.status(401).json({error: 'UNAUTHORIZED'});
            }
            return res.status(200).json(chatroom);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getClosest(req, res) {
        const resPerPage = parseInt(req.query.perPage) || 10; // results per page
        const page = parseInt(req.query.page) || 1; // Page
        const [long, lat] = req.user.coordinates;
        const name = req.query.name || null;
        const distance = req.query.distance || 1000;
        var userId = req.user.id;
        try {
            const [total, chatrooms] = await chatroomService.getClosest(userId, long, lat, distance, resPerPage, page, name);
            return res.json({total, resPerPage, page, chatrooms});
        } catch (error) {
            return res.json(error);
        }
    }

    async getMyChatrooms(req, res) {
        var userId = req.user.id;
        const chatrooms = await chatroomService.getMyChatrooms(userId);
        return res.json(chatrooms);
    }

    async getMyRequests(req, res) {
        var userId = req.user.id;
        var status = req.query.status || "PENDING";
        const chatrooms = await chatroomService.getMyRequests(userId, status);
        return res.json(chatrooms);
    }

    async deleteChatroom(req, res) {
        var userId = req.user.id;
        var chatroomId = req.params.id;
        const chr = await chatroomService.deleteChatroom(userId, chatroomId);
        return res.json(chr);
    }

}

export default new ChatroomController()