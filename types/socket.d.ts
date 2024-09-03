// types/socket.d.ts
export interface ClientToServerEvents {
  'join-room': (roomId: string, userId: string) => void;
  'user-toggle-audio': (userId: string, roomId: string) => void;
  'user-toggle-video': (userId: string, roomId: string) => void;
  'user-leave': (userId: string, roomId: string) => void;
}

export interface ServerToClientEvents {
  'user-connected': (userId: string) => void;
  'user-toggle-audio': (userId: string) => void;
  'user-toggle-video': (userId: string) => void;
  'user-leave': (userId: string) => void;
}

export interface InterServerEvents {
  // Define any inter-server events if necessary
}

export interface SocketData {
  // Define any additional data for your sockets if necessary
}

