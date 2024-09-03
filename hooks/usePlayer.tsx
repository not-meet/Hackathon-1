import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useSocket } from '@/context/socket';
import { useRouter } from 'next/router';
import Peer from 'peerjs';

// Define types for player and players state
interface Player {
  url: MediaStream;
  muted: boolean;
  playing: boolean;
}

interface Players {
  [id: string]: Player;
}

const usePlayer = (myId: string, roomId: string, peer: Peer | null) => {
  const socket = useSocket();
  const [players, setPlayers] = useState<Players>({});
  const router = useRouter();

  // Clone players state for manipulation
  const playersCopy = cloneDeep(players);

  // Get the currently highlighted player
  const playerHighlighted = playersCopy[myId];
  delete playersCopy[myId]; // Remove current player from the copy

  // Remaining players
  const nonHighlightedPlayers = playersCopy;

  const leaveRoom = () => {
    if (socket) {
      socket.emit('user-leave', myId, roomId);
      console.log("Leaving room", roomId);
    }
    peer?.disconnect(); // Disconnect peer
    router.push('/'); // Redirect to home
  };

  const toggleAudio = () => {
    console.log("Toggling audio");
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      if (copy[myId]) {
        copy[myId].muted = !copy[myId].muted;
      }
      return { ...copy };
    });
    if (socket) {
      socket.emit('user-toggle-audio', myId, roomId);
    }
  };

  const toggleVideo = () => {
    console.log("Toggling video");
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      if (copy[myId]) {
        copy[myId].playing = !copy[myId].playing;
      }
      return { ...copy };
    });
    if (socket) {
      socket.emit('user-toggle-video', myId, roomId);
    }
  };

  return {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  };
};

export default usePlayer;

