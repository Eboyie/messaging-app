import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return useSocketMap[receiverId];
};

const useSocketMap = {}; // { userId: socketId }

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != 'undefined') useSocketMap[userId] = socket.id;

  //io.emit(), send events to all(every) online clients
  io.emit('getOnlineUsers', Object.keys(useSocketMap));

  //socket.on(), to listen to a bidirectional and event-based communication between a client and a server
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    delete useSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(useSocketMap));
  });
});

export { app, io, server };
