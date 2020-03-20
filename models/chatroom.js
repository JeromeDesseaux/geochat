import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const chatroomRequest = new Schema({
    user: {
        type: ObjectId,
        required: true
    },
    message: String,
    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
        default: 'PENDING'
    }
}, {
    timestamps: true
});

const chatroomMessage = new Schema({
    user:{
        type: ObjectId,
        required: true
    },
    message: String
},{
    timestamps: true
});

const chatroomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: ObjectId,
        required: true
    },
    participants: [chatroomRequest],
    messages: [chatroomMessage]

}, {
    timestamps: true
});

export const Chatroom = mongoose.model('Chatroom', chatroomSchema);
export const ChatroomRequest = mongoose.model('ChatroomRequest', chatroomRequest);
export const ChatroomMessage = mongoose.model('ChatroomMessage', chatroomMessage);