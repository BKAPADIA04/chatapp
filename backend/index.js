require("dotenv").config();

const connectToMongo = require('./db.js');
const express = require('express');
const cors = require('cors');

connectToMongo();

const server = express();
const port = process.env.PORT;

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World!');
});

const userRouter = require('./routes/User.js');
server.use('/signup',userRouter.userRoute);

server.listen(port, () => {
    console.log(`Chat App listening on port ${port}`)
});