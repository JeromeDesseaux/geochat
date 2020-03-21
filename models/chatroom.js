import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const chatroomRequest = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: "User",
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
        required: true,
        maxlength: 60,
        unique: true
    },
    admin: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    participants: [chatroomRequest],
    messages: [chatroomMessage],
    visibility: {
        type: String,
        enum: ['PUBLIC', 'PRIVATE'],
        default: 'PRIVATE'
    },
    location: {
        type: {
            type: String, 
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, {
    timestamps: true
});

chatroomSchema.index({
    location: '2dsphere'
});

export const Chatroom = mongoose.model('Chatroom', chatroomSchema);
export const ChatroomRequest = mongoose.model('ChatroomRequest', chatroomRequest);
export const ChatroomMessage = mongoose.model('ChatroomMessage', chatroomMessage);