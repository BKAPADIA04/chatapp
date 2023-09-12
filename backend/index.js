require("dotenv").config();

const connectToMongo = require("./db.js");
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

connectToMongo();

const server = express();
const httpServer = createServer(server);
const io = new Server(httpServer);
const port = process.env.PORT;

const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send(index);
});

const userRouter = require("./routes/User.js");
server.use("/user", userRouter.userRoute);

io.on("connection", (socket) => {
    console.log("connected");
    console.log(socket.id);
});

server.listen(port, () => {
  console.log(`Chat App listening on port ${port}`);
});
