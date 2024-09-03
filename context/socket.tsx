import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

// Create a context with an initial value of null
const SocketContext = createContext<Socket | null>(null);

// Custom hook to use the Socket context
export const useSocket = (): Socket | null => {
  return useContext(SocketContext);
};

// Define props type for SocketProvider
interface SocketProviderProps {
  children: ReactNode;
}

// SocketProvider component
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Create a socket connection
    const connection = io();
    console.log("socket connection", connection);
    setSocket(connection);

    // Clean up on component unmount
    return () => {
      connection.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // Define error handling for socket connection
      const handleConnectError = async (err: Error) => {
        console.log("Error establishing socket", err);
        await fetch('/api/socket');
      };

      socket.on('connect_error', handleConnectError);

      // Clean up the event listener on unmount
      return () => {
        socket.off('connect_error', handleConnectError);
      };
    }
  }, [socket]);

  return (
    <SocketContext.Provider value= { socket } >
    { children }
    </SocketContext.Provider>
  );
};

