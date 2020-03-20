import express from 'express';
import chatroomRouter from './routes/chatroom';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/chatrooms', chatroomRouter);

app.listen(port, ()=> {  
    console.log('app is listening on port 3000');
});