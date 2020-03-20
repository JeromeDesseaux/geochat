import {
    Chatroom
} from "../models/chatroom";

class ChatroomRepository {

    async create(data) {
        try {
            return await Chatroom.create(data);
        } catch (error) {
            throw error;
        }
    }

}

export default new ChatroomRepository();