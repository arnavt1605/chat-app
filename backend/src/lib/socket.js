import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);  //let express deal with the http request

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]  // Only clients loaded from http://localhost:5173 are allowed to open a socket connection to this server
    }
})


export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// store online users
const userSocketMap = {}; // {userID: socketID} pair

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    // send event to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);

        delete userSocketMap[userId];

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})


export { io, app, server };


// Server => creates a websocket capable server on top of http server

// Socket.IO uses:
// HTTP for handshake
// WebSockets afterwards
