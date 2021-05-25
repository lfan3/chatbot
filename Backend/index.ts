require('dotenv').config()

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const bodyParser = require('body-parser')
const cors = require('cors')
const { Server } = require("socket.io");

const router = express.Router();


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

let messages= [];
//const message = {room:"", userId:"", seperator: 'a', text:"", time:""}; //userId, text, time, room will be store in database
function deleteMessage(userId, txt, timeData){
    const newMessages = messages.filter(m =>{
        return ! (m.userId === userId && m.text === txt && m.time.toString() === timeData)
    })
    return newMessages;
}

io.on('connection', (socket)=>{
    //const {id} = socket.client;
    let userId;
    socket.on('initRoom', data => {
        userId = data.userId;
        console.log(userId)
        socket.join('room')
    });
    socket.on("message from client", (data)=>{
        const text = data.toUpperCase();
        const message = {
            room:"room", 
            userId:userId, 
            seperator: userId == 10 ? 'a':'b', 
            text:text, 
            time:Date.now()
        }
        messages = [...messages, message];
        io.to('room').emit("message from api", {msgs: messages});
    })
    socket.on('delete message', ({userId,txt, timeData})=>{
        messages = deleteMessage(userId, txt, timeData);
        io.to('room').emit("message from api", {msgs: messages})
    })
    socket.on('disconnect', ()=>{
        console.log("user is leaving");
    })
})

router.get("/", (req, res)=>{
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
