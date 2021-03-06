
require('dotenv').config()

/**
 * es6 modules with ts.config *
 */

import express from 'express';
import {Request, Response} from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server, Socket } from "socket.io";
import path from 'path';

const router = express.Router();

const buildPath = path.resolve("../Frontend/dist")
app.use(express.static(buildPath));
app.use('/littleCat', express.static(buildPath));
app.use('/zenCat', express.static(buildPath));

//const router = require('./router')
const port = process.env.PORT || 3000;
//todo port
app.use(cors({
    origin : 'http://localhost:8085',
    methods : ['GET', 'POST'],
    credentials:true
}));

app.use(bodyParser.json({limit : '10mb'}))
app.use(bodyParser.urlencoded({extended : true, limit : '10mb'}));
app.use(router)

/**
 * socket part *
 */
const io = new Server(server, {  
    cors: {
    origin: "http://localhost:8085",
    methods: ["GET", "POST"],
    credentials: true
  }});

interface Message{
    room?:string; 
    userId:string, 
    seperator?: string, 
    text:string, 
    time:number | string
}

let messages: Array<Message> = [];
//const message = {room:"", userId:"", seperator: 'a', text:"", time:""}; //userId, text, time, room will be store in database
function deleteMessage(userId:string, txt:string, time: string|number){
    const newMessages = messages.filter(m =>{
        return ! (m.userId === userId && m.text === txt && m.time.toString() === time)
    })
    return newMessages;
}

io.on('connection', (socket: Socket)=>{

    //const {id} = socket.client;
    let userId:string;
    socket.on('initRoom', (data:any) => {
        userId = data.userId;
        console.log(userId)
        socket.join('room')
    });
    socket.on("message from client", (data:any)=>{
        const text = data.toUpperCase();
        const message: Message = {
            room:"room", 
            userId:userId, 
            seperator: userId == '10' ? 'a':'b', 
            text:text, 
            time:Date.now()
        }
        messages = [...messages, message];
        io.to('room').emit("message from api", {msgs: messages});
    })
    socket.on('delete message', ({userId, text, time}: Message)=>{
        console.log('delete message', {userId, text, time})
        messages = deleteMessage(userId, text, time);
        console.log('remaining messages:', messages)
        io.to('room').emit("message from api", {msgs: messages})
    })
    socket.on('disconnect', ()=>{
        console.log("user is leaving");
    })
})

router.get("/messages", (req: Request, res: Response)=>{
    res.send({res: messages})
})
// let interval;

// function getApiAndEmit(socket){
//     const response = new Date();
//     socket.emit('from Api', response)
// }

// io.on('connection', (socket) => {
//     console.log('a new user connected');
//     if(interval){
//         clearInterval(interval);
//     }
//     interval = setInterval(()=>getApiAndEmit(socket), 1000)
//     socket.on('disconnect', ()=>{
//         console.log('Client disconnect');
//         clearImmediate(interval);
//     })

// });

/**
 * end of socket part *
 */

server.listen(port, ()=>{
    console.log('running on 3000');
})
