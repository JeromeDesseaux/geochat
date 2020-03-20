import express from 'express';
import logger from "morgan";
import bodyParser from "body-parser";
import chatroomRouter from './routes/chatroom.routes';
import userRouter from './routes/user.routes';
import mongoose from "mongoose";
import dotenv from "dotenv";
import expressip from "express-ip";

dotenv.config()

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressip().getIpInfoMiddleware);
// app.use(express.json());

app.use('/chatrooms', chatroomRouter);
app.use('/users', userRouter);

app.listen(port, ()=> {  
    console.log(`🍺 Server listening on port ${port}`);
});