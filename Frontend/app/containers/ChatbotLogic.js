import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const ENDPOINT = "http://localhost:3000";
import Chatbox from './Chatbox';
import Avatar from '../components/Avatar';
import '../style/chatbot.css';



export default function ChatbotLogic(props){
    const usernameA="little cat";
    const usernameB = "gigi"

    return(
        <React.Fragment>
        {props.children(usernameA, usernameB)}

        </React.Fragment>
    )
}