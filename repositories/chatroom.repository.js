import {
    Chatroom
} from "../models/chatroom";
import mongoose, {
    mongo
} from "mongoose";

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
            return await Chatroom.findById(id).populate("participants.user").populate("messages.user").sort("messages.createdAt");
        } catch (error) {
            throw error;
        }
    }

    async getByNameContains(name) {
        try {
            return await Chatroom.find({
                "name": {
                    "$regex": name,
                    "$options": "i"
                }
            }).select("-messages");
        } catch (error) {
            return null;
        }

    }

    async getByLocation(userId, long, lat, distance, resPerPage, page, name) {
        try {
            const namer = name || "";
            let cr = await Chatroom.aggregate(
                [{
                        "$geoNear": {
                            "near": {
                                type: "Point",
                                coordinates: [long, lat]
                            },
                            "key": "location",
                            "maxDistance": distance * 1000,
                            "distanceField": "distance",
                            "spherical": true
                        }
                    },
                    {
                        "$match": {
                            $and: [{
                                    "participants.user": {
                                        $ne: mongoose.Types.ObjectId(userId)
                                    }
                                },
                                {
                                    admin: {
                                        $ne: mongoose.Types.ObjectId(userId)
                                    }
                                },
                                {
                                    name: {
                                        "$regex": namer,
                                        "$options": "i"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "$project": {
                            "name": 1,
                            "admin": 1,
                            "distance": 1,
                            "participants": {
                                $filter: {
                                    input: '$participants',
                                    as: 'participant',
                                    cond: {
                                        $and: [{
                                                "$eq": [
                                                    "$$participant.user",
                                                    userId
                                                ],
                                            },
                                            {
                                                "$eq": [
                                                    "$$participant.status",
                                                    "ACCEPTED"
                                                ]
                                            }

                                        ]
                                    }
                                }
                            },
                            "visibility": 1,
                            "location": 1,
                            "createdAt": 1,
                            "nbMessages": {
                                "$size": "$messages"
                            },
                            "nbParticipants": {
                                "$size": "$participants"
                            }
                        }
                    },
                    {
                        "$sort": {
                            "nbParticipants": -1,
                            "nbMessages": -1,
                            "distance": -1,
                            "createdAt": 1
                        }
                    },
                    {
                        $facet: {
                            paginatedResults: [{
                                $skip: (resPerPage * page) - resPerPage
                            }, {
                                $limit: resPerPage
                            }],
                            totalCount: [{
                                $count: 'count'
                            }]
                        }
                    }
                ],
            );
            return cr;
        } catch (error) {
            return null;
        }
    }

    async getAllByUser(userId) {
        try {
            return await Chatroom.find({
                $or: [{
                        "admin": userId
                    },
                    {
                        "participants": {
                            $elemMatch: {
                                "user": userId,
                                "status": "ACCEPTED"
                            }
                        }
                    }
                ]
            }).populate("participants.user").select("-messages").sort({
                "participants": -1
            });
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

    async delete(userId, chatroomId) {
        try {
            return await Chatroom.findOneAndDelete({
                _id: chatroomId,
                admin: userId
            });
        } catch (err) {
            return null;
        }
    }

}

export default new ChatroomRepository();