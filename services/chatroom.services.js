import chatroomRepository from "../repositories/chatroom.repository";


class ChatroomService {
    async create(chatroom) {
        return await chatroomRepository.create(chatroom);
    }

    async sendRequest() {

    }

    async validateRequest() {

    }

    async getClosest() {

    }

    async get() {

    }

    async removeUser() {

    }

}

export default new ChatroomService();