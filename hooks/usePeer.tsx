import { useSocket } from "@/context/socket";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Peer from "peerjs";

const usePeer = () => {
  const socket = useSocket();
  const router = useRouter();
  const roomId = router.query.roomId as string; // Type assertion to string
  const [peer, setPeer] = useState<Peer | null>(null);
  const [myId, setMyId] = useState<string>('');
  const isPeerSet = useRef(false);

  useEffect(() => {
    if (isPeerSet.current || !roomId || !socket) return;
    isPeerSet.current = true;

    (async function initPeer() {
      const Peer = (await import('peerjs')).default; // Dynamically import Peer
      const myPeer = new Peer(); // Instantiate Peer
      setPeer(myPeer);

      myPeer.on('open', (id) => {
        console.log(`your peer id is ${id}`);
        setMyId(id);
        socket?.emit('join-room', roomId, id);
      });
    })();
  }, [roomId, socket]);

  return {
    peer,
    myId
  };
};

export default usePeer;

