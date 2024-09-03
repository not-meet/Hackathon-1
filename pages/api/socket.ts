import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIOServer, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
} from '../../types/socket';

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log("called api");

  const server = (res.socket as any).server; // Type assertion to bypass TypeScript errors

  if (server.io) {
    console.log("Server is already running");
  } else {
    if (!server) {
      throw new Error('Server is not available on res.socket');
    }

    const io = new SocketIOServer<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >(server);

    server.io = io;

    io.on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) => {
      console.log("server is connected");

      socket.on('join-room', (roomId: string, userId: string) => {
        console.log(`a new user ${userId} joined room ${roomId}`);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', userId);
      });

      socket.on('user-toggle-audio', (userId: string, roomId: string) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-toggle-audio', userId);
      });

      socket.on('user-toggle-video', (userId: string, roomId: string) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-toggle-video', userId);
      });

      socket.on('user-leave', (userId: string, roomId: string) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-leave', userId);
      });
    });
  }

  res.end();
}

export default SocketHandler;

