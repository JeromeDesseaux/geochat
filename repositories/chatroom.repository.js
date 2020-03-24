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
            }).select("-messages");
        } catch (error) {
            return null;
        }

    }

    async getByLocation(userId, long, lat, distance, resPerPage, page, name) {
        try {
            let condition = {
                admin: {
                    $ne: userId
                },
                participants: {
                    $not: {
                        $elemMatch: {
                            "user": userId,
                        }
                    }
                },
                location: {
                    $near: {
                        $maxDistance: distance,
                        $geometry: {
                            type: "Point",
                            coordinates: [long, lat]
                        }
                    },
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
            const chatrooms = await Chatroom.find(condition).skip((resPerPage * page) - resPerPage).limit(resPerPage).select("-messages");
            return [total, chatrooms];
        } catch (error) {
            return null;
        }
    }

    async getAllByUser(userId) {
        try {
            return await Chatroom.find({
                $or: [
                    {"admin": userId},
                    {"participants": {
                            $elemMatch: {
                                "user": userId,
                                "status": "ACCEPTED"
                            }
                        }
                    }
                ]
            }).select("-messages");
        } catch (error) {
            return [];
        }
    }

    async getRequestsByUser(userId, status) {
        try {
            return await Chatroom.find({
                "participants": {
                    $elemMatch: {
                        "user": userId,
                        "status": status
                    }
                }
            }).select("-messages");
        } catch (error) {
            return [];
        }
    }

}

export default new ChatroomRepository();