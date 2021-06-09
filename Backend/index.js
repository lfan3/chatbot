var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var bodyParser = require('body-parser');
var cors = require('cors');
var Server = require("socket.io").Server;
var path = require("path");
var router = express.Router();
var buildPath = path.resolve("../Frontend/dist");
app.use(express.static(buildPath));
app.use('/littleCat', express.static(buildPath));
app.use('/zenCat', express.static(buildPath));
//const router = require('./router')
var port = process.env.PORT || 3000;
//todo port
app.use(cors({
    origin: 'http://localhost:8085',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(router);
/**
 * socket part *
 */
var io = new Server(server, {
    cors: {
        origin: "http://localhost:8085",
        methods: ["GET", "POST"],
        credentials: true
    }
});
var messages = [];
//const message = {room:"", userId:"", seperator: 'a', text:"", time:""}; //userId, text, time, room will be store in database
function deleteMessage(userId, txt, time) {
    var newMessages = messages.filter(function (m) {
        return !(m.userId === userId && m.text === txt && m.time.toString() === time);
    });
    return newMessages;
}
io.on('connection', function (socket) {
    //const {id} = socket.client;
    var userId;
    socket.on('initRoom', function (data) {
        userId = data.userId;
        console.log(userId);
        socket.join('room');
    });
    socket.on("message from client", function (data) {
        var text = data.toUpperCase();
        var message = {
            room: "room",
            userId: userId,
            seperator: userId == '10' ? 'a' : 'b',
            text: text,
            time: Date.now()
        };
        messages = __spreadArray(__spreadArray([], messages), [message]);
        io.to('room').emit("message from api", { msgs: messages });
    });
    socket.on('delete message', function (_a) {
        var userId = _a.userId, text = _a.text, time = _a.time;
        messages = deleteMessage(userId, text, time);
        io.to('room').emit("message from api", { msgs: messages });
    });
    socket.on('disconnect', function () {
        console.log("user is leaving");
    });
});
// router.get("/", (req, res)=>{
//     res.send({res: messages})
// })
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
server.listen(port, function () {
    console.log('running on 3000');
});
