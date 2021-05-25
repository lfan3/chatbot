import ReactDOM from 'react-dom'
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LittleCatPublic from './roots/littleCatPublic';
import LittleCatPrivate from './roots/littleCatPrivate';
const ENDPOINT = "http://localhost:3000";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function App(){
    return(
        <Router>
            <Route path='/home' component={LittleCatPublic} />
            <Route path='/private' component={LittleCatPrivate} />
        </Router>
    )
  
}


ReactDOM.render(
    <App/>,
    document.getElementById('app')
)