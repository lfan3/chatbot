import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const ENDPOINT = "http://localhost:3000";
import Chatbox from '../containers/Chatbox';
import ChatbotLogic from '../containers/ChatbotLogic';

import Avatar from '../components/Avatar';
import '../style/chatbot.css';

export default function LittleCatPrivate(){
    const userId = 10;
    return(
        <ChatbotLogic>
        {
            (usernameA, usernameB)=>(
            <React.Fragment>

                <div className='chat--begin'>
                    <Avatar path="./public/littleCat.jpg" size="avatar-medium"/>
                    <p>this is private page</p>
                </div>
                <Chatbox
                    userId = {userId}
                />
            </React.Fragment>

            )
        }
        </ChatbotLogic>
    )
}

