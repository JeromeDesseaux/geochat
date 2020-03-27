import express from 'express';
import logger from "morgan";
import bodyParser from "body-parser";
import chatroomRouter from './routes/chatroom.routes';
import userRouter from './routes/user.routes';
import mongoose from "mongoose";
import dotenv from "dotenv";
import expressip from "express-ip";
import cors from "cors";
import chatroomRepository from "./repositories/chatroom.repository";
import { ChatroomMessage } from './models/chatroom';


dotenv.config()

const app = express();
const port = process.env.PORT;

var server = require('http').createServer(app);
var io = require('socket.io')(server);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressip().getIpInfoMiddleware);
// app.use(express.json());

app.use('/chatrooms', chatroomRouter);
app.use('/users', userRouter);



// socket.io
io.on('connection', function (client) {
    client.on("joinchatroom", function (chatroom) {
        client.join(chatroom);
    })
    client.on('sendmessage', async function (data) {
        try {
            const cr = await chatroomRepository.getById(data.chatroom);
            if(cr.admin == data.user.id || cr.participants.filter(part => part.user.id == data.user.id && part.status === "ACCEPTED").length > 0) 
            {
                let message = new ChatroomMessage({
                    user: data.user.id,
                    message: data.message
                });
                cr.messages.push(message);
                cr.save();
                client.broadcast.to(data.chatroom).emit('received', data);
            }
        } catch (error) {
            console.log(error);
        }
    });
});

server.listen(port, ()=> {  
    console.log(`🍺 Server listening on port ${port}`);
});
