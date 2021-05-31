import ReactDOM from 'react-dom'
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import zenCat from './routes/zenCat';
import littleCat from './routes/littleCat';
const ENDPOINT = "http://localhost:3000";
import './index.css'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function App(){
    return(
        <Router>
            <Switch>
                <Route path='/' exact component={littleCat} />
                <Route path='/zenCat' component={zenCat} />
            </Switch>
        </Router>
    )
  
}


ReactDOM.render(
    <App/>,
    document.getElementById('app')
)