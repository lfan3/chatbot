import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const ENDPOINT = "http://localhost:3000";
import Chatbox from './Chatbox';
import Avatar from '../components/Avatar';
import '../style/chatbot.css';

// const socket = socketIOClient(ENDPOINT);

export default function Chatbot(){
    const usernameA="little cat";
    const usernameB = "gigi"
    const [showChatBox, setShowChatBox] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);


    // useEffect(()=>{
    //     socket.on("connect", ()=>{
    //         socket.emit("welcome", {usernameA})
    //     })
    //     socket.on("welcome", (data)=>{
    //       console.log('welcome data ',data)
    //     })
    //     socket.on("message from api",data=>{
    //         let msgs = data.msgs;
    //         console.log(data)
    //         console.log(msgs)
    //         setMessages([...msgs]);
    //     })
    //     if(message !== ""){
    //         socket.emit("message from client", message);
    //     }
    //     //return ()=>socket.disconnect();
    // }, [message])

    const changeHandler = (e)=>{
        const f = document.getElementsByClassName('chatbox-footer')[0];
        const c = document.getElementsByClassName('chatbox-content')[0];
        const footerHeight = f.offsetHeight;
        const contentHeight = c.offsetHeight;
        const lastLen = e.currentTarget.getAttribute('data-last-input-lenght');
        const val = e.target.value;
        
        setInputValue(val);
        //increasing or decreasing the input height
        if(footerHeight < 150){
            if(val.length % 28 === 0 && (lastLen < val.length)){
                f.style.height = footerHeight  + 25 + 'px';
                c.style.height = contentHeight - 25 + 'px';
                e.currentTarget.setAttribute('data-last-input-lenght', val.length)
            }else if(val.length % 28 === 0 && (lastLen > val.length)){
                f.style.height = footerHeight  - 25 + 'px';
                c.style.height = contentHeight + 25 + 'px';
                e.currentTarget.setAttribute('data-last-input-lenght', val.length)
            }
        }
    }

    const sendMessage = ()=>{
        setMessage(inputValue)
        setInputValue("")
    }
    //e.keyCode not work...
    const handleKeypress = (e)=>{
        if(e.key==='Enter'){
            e.preventDefault();
            sendMessage()
        }
    }
    const beginChat = ()=>{
        //socket.emit("welcome", {username});
        setShowChatBox(true);
    }
    return(
        <React.Fragment>
        
            <div className='chat--begin'>
                <Avatar path="./public/littleCat.jpg" size="avatar-medium"/>
                <Button onClick={()=>beginChat()}>send a message to {usernameA}</Button>
            </div>
            <Chatbox
                usernameA = {usernameA}
                messages = {messages}
                changeHandler = {changeHandler}
                handleKeypress = {handleKeypress} 
                inputValue = {inputValue}
                sendMessage = {sendMessage}
            />
        
        </React.Fragment>
    )
}