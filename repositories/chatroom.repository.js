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

    async getById(id) {
        try {
            return await Chatroom.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async getByNameContains(name) {
        try {
            return await Chatroom.find({
                "name" :{
                    "$regex": name, "$options": "i"
                }
            });
        } catch (error) {
            return null;
        }

    }

    async getByLocation(long, lat, distance, resPerPage, page, name) {
        try {
            let condition = {
                location: {
                    $near: {
                        $maxDistance: distance,
                        $geometry: {
                            type: "Point",
                            coordinates: [long, lat]
                        }
                    }
                }
            };
            if(name) {
                condition = {
                    ...condition,
                    "name": {
                        "$regex": name,
                        "$options": "i"
                    }
                }
            }
            const total = await Chatroom.find(condition).count();
            const chatrooms = await Chatroom.find(condition).skip((resPerPage * page) - resPerPage).limit(resPerPage);
            return [total, chatrooms];
        } catch (error) {
            return null;
        }
    }

}

export default new ChatroomRepository();