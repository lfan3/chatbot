import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const ENDPOINT = "http://localhost:3000";
import ChatbotLogic from '../containers/ChatbotLogic';
import PageContent from '../components/PageContent';


import '../style/chatbot.css';

// export default function littleCat(){
//     const userId = 20;
//     const userName = 'zenCat'
//     return(
//             <React.Fragment>

//                 <div className='chat--begin'>
//                     <Avatar path="./public/littleCat.jpg" size="avatar-medium"/>
//                     <p>this is {userName} page</p>
//                 </div>
//                 <Chatbox
//                     userId = {userId}
//                 />
//             </React.Fragment>
//     )
// }

export default function zenCat(){
    const userId = 20;
    const userName = 'zenCat';
    return(
        <PageContent userId = {userId} userName = {userName}/>
    )
}


