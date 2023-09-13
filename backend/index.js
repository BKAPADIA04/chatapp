require("dotenv").config();

const connectToMongo = require("./db.js");
const express = require("express");
const cors = require("cors");

connectToMongo();

const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
const port = process.env.PORT || 8080;

const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send(index);
});

const userRouter = require("./routes/User.js");
server.use("/user", userRouter.userRoute);

io.on('connection',(socket) => {
  socket.on('login',({name,room},callback) => {
    //Call addUser,deleteUser,....
    //Make use of useEffect on user
  })

  socket.on('sendMessage',(message) => {
    //Call sendMessage in useEffect
  })  

  socket.on('disconnect',() => {

  })
})

server.listen(port, () => {
  console.log(`Chat App listening on port ${port}`);
});
