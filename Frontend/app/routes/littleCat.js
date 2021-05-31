import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const ENDPOINT = "http://localhost:3000";
import Chatbox from '../containers/Chatbox';
import ChatbotLogic from '../containers/ChatbotLogic';
import PageContent from '../components/PageContent';
import Avatar from '../components/Avatar';
import '../style/chatbot.css';


export default function littleCat(){
    const userId = 10;
    const userName = 'littleCat';
    return(
        <PageContent userId = {userId} userName = {userName}/>
    )
}
