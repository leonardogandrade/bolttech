const requireDir = require('require-dir');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});

//Config
app.use(cors());
app.use(express.json());

//Database
mongoose.connect(process.env.MONGO, (err) => {
    if (err)
        throw err;
    else
        console.log('[OK] database connected.')
})

//Models
requireDir('./src/model');

//Websocket
app.use((req, res, next) => {
    req.io = io;
    next();
})

//Routes
app.use('/', require('./src/routes'));
app.use('/api', require('./src/auth_routes'));


server.listen(process.env.PORT || 3002);
console.log(`[OK] server started.`);
