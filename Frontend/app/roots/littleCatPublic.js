import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const ENDPOINT = "http://localhost:3000";
import Chatbox from '../containers/Chatbox';
import ChatbotLogic from '../containers/ChatbotLogic';

import Avatar from '../components/Avatar';
import '../style/chatbot.css';

export default function LittleCatPublic(){
    const userBId = 20;

    return(
        <ChatbotLogic>
        {
            (usernameA, usernameB)=>(
            <React.Fragment>

                <div className='chat--begin'>
                    <Avatar path="./public/littleCat.jpg" size="avatar-medium"/>
                    <p>This is little cat public page</p>
                    <p> send a message to little cat</p>
                </div>
                <Chatbox
                userId = {userBId}
           
                />
            </React.Fragment>

            )
        }
        </ChatbotLogic>
    )
}

