import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '../components/Avatar';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import red from '@material-ui/core/colors/red';
import '../style/chatbox.css';
/**
 * chatbox-header add a component *
 */
const ENDPOINT = "http://localhost:3000";
const socket = socketIOClient(ENDPOINT);

export default function Chatbox({userId, imgPath, userName}){
    const chatboxRef = useRef();
    const chatboxContentRef = useRef();
    const redDotRef = useRef();
    const [small, setSmall] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [message, setMessage] = useState("");
    const [sendMessageNum, setSendMessageNum] = useState(0);
    const [messages, setMessages] = useState([]);
    const [read, setRead] = useState(true);

    useEffect(()=>{
        //get message from back
        fetch(ENDPOINT)
            .then(res => res.json())
            .then(data => {
                setMessages(data.res)
            })
    },[])

    useEffect(()=>{
        socket.on("connect", ()=>{
            socket.emit("initRoom", {userId : userId})
        })
        if(read || !small)
            redDotRef.current.style.display = 'none'
        else if(!read && small)
            redDotRef.current.style.display = 'block'

        socket.on("message from api",data=>{
            let msgs = data.msgs;
            if(small){
                setRead(false);
            }
            setMessages([...msgs]);
        })
        if(message !== ""){
            socket.emit("message from client", message);
        }
        //return ()=>socket.disconnect();
    }, [message, sendMessageNum, read, small])
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
        if(inputValue !== "")
            setMessage(inputValue)
        setInputValue("")
        setSendMessageNum(m => m+1) //need this because, if the message is the same, then the useEffect only depend on message will not be called
    }
    //e.keyCode not work...
    const handleKeypress = (e)=>{
        if(e.key==='Enter'){
            e.preventDefault();
            sendMessage()
            //scroll bar goes to bottom automaticlly
            if(chatboxContentRef.current.scrollHeight > 450){
                chatboxContentRef.current.scrollTop = chatboxContentRef.current.scrollHeight
            }
        }
    }
    const toggleChatbox = ()=>{
        const chatbox = chatboxRef.current;
        setSmall(s => !s)
        
    }

    const showDelete = (e)=>{
        if(e.target.tagName === 'DIV'){
            if(e.target.children[0].tagName == 'BUTTON'){
                e.target.children[0].style.display = 'block'
            }else{
                e.target.children[1].style.display = 'block'
            }
        }
    }
    const removeDelete = (e)=>{
        if(e.target.tagName === 'DIV'){
            if(e.target.children[0].tagName == 'BUTTON'){
                e.target.children[0].style.display = 'none'
            }else{
                e.target.children[1].style.display = 'none'
            }
        }    
    }
    const deleteMessage = (e)=>{
        const messageDiv = e.target.closest('div');
        const messageP = messageDiv.children[0].tagName == 'BUTTON' ? messageDiv.children[1] : messageDiv.children[0];
        const txt = messageP.textContent;
        const timeData = messageP.getAttribute('data-time');
        const userId = messageDiv.classList.contains('a') ? 10 : 20;
        socket.emit('delete message', {userId,txt, timeData})
    }
    return(
        <div className="chatbox" ref={chatboxRef} style={{height : small ? '3.5rem':'35rem'}}>
        <FiberManualRecordIcon style={{ color: red[500] }} className='red-dot' ref={redDotRef} />
        <div className="chatbox-header" onClick={toggleChatbox}>
            <Avatar path= {imgPath} size="avatar-sm"/>
            <span>{userName}</span>
        </div> 
        <div className='chatbox-content' ref={chatboxContentRef} >
        {
            //!!pay attention to ternary condition!!!
            messages.map((val,index)=>(
                val.seperator==='a'
                ? <div key={`message-${index}`} className="chatbox-content-message a" onMouseEnter ={showDelete} onMouseLeave={removeDelete}>
                    <p className='message-a' data-time={val.time}>{val.text}</p>
                    <IconButton aria-label="delete" onClick={deleteMessage}>
                        <DeleteIcon />
                    </IconButton>
                </div>
                : <div key={`message-${index}`} className="chatbox-content-message b" onMouseOver={showDelete} onMouseLeave={removeDelete}>
                    <IconButton aria-label="delete" onClick={deleteMessage}>
                        <DeleteIcon />
                    </IconButton>
                    <p className='message-b' data-time={val.time}>{val.text}</p>
                 </div>
            ))
        }

        </div>
        <div className="chatbox-footer">
            <Form className='chatbox-footer-form'>
                <textarea cols="20" maxLength="320" className='chatbox-footer-input' placeholder="message" onChange={changeHandler}  onKeyDown={(e)=>handleKeypress(e)} value={inputValue}/>
            </Form> 
 
            <Button type='submit' onClick={sendMessage}>send</Button>
        </div>
        </div>
    )

}