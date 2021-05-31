
const express = require('express')
const app = express()
const http = require('http')

const path = require("path");

const router = express.Router();

const buildPath = path.resolve("../Frontend/dist")
app.use(express.static(buildPath));