import chatroomRepository from "../repositories/chatroom.repository";
import {ChatroomRequest} from "../models/chatroom";
import { AlreadyTakenError} from "./user.services";


class ChatroomService {
    async create(chatroom) {
        try {
            return await chatroomRepository.create(chatroom);
        } catch (error) {
            if (error.keyValue.name) {
              throw new AlreadyTakenError("NAME_TAKEN");
            };
            throw error;
        }
    }

    async sendRequest(chatroomId, userId, message) {
        try {
            let chatroom = await chatroomRepository.getById(chatroomId);
            if(chatroom){
                let existingRequest = chatroom.participants.filter((participant) => participant.user == userId);
                if(existingRequest.length == 0){
                    let request = new ChatroomRequest({
                        user: userId,
                        message: message
                    });
                    if(chatroom.visibility){
                        if(chatroom.visibility == "PUBLIC") {
                            request.status = "ACCEPTED";
                        }
                    }
                    chatroom.participants.push(request);
                    chatroom.save();
                    return chatroom;
                }
                throw new AlreadyTakenError("REQUEST_EXISTS");
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async removeRequest(chatroomId, userId) {
        try {
            let chatroom = await chatroomRepository.getById(chatroomId);
            if (chatroom) {
                console.log(chatroom);
                let existingRequest = chatroom.participants.filter((participant) => participant.user == userId);
                if (existingRequest.length > 0) {
                    existingRequest.forEach(request => {
                        console.log("removing");
                        chatroom.participants.id(request.id).remove();
                    });
                    chatroom.save();
                }
                return chatroom;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async validateRequest(id, userId, requestId, status) {
        try {
            let chatroom = await chatroomRepository.getById(id);
            if (chatroom.admin == userId) {
                const address = chatroom.participants.id(requestId);
                address.status = status; 
                chatroom.save();
                return chatroom;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }

    }

    async getClosest(userId, long, lat, distance, resPerPage, page, name) {
        return await chatroomRepository.getByLocation(userId, long, lat, distance, resPerPage, page, name);
    }

    async get(id) {
        try {
            return await chatroomRepository.getById(id);
        } catch (error) {
            return null;
        }
    }

    async removeUser() {

    }
    
    async getMyChatrooms(userId) {
        return await chatroomRepository.getAllByUser(userId);
    }

    async getMyRequests(userId, status){
        return await chatroomRepository.getRequestsByUser(userId, status);
    }

    async deleteChatroom(userId, chatroomId) {
        return await chatroomRepository.delete(userId, chatroomId);
    }

}

export default new ChatroomService();