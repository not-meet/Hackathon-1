import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');

  const createAndJoin = () => {
    const newRoomId = uuidv4();
    router.push(`/${newRoomId}`);
  };

  const joinRoom = () => {
    if (roomId) {
      router.push(`/${roomId}`);
    } else {
      alert('Please provide a valid room id');
    }
  };

  return (
    <div className="w-4/12 mx-auto p-4 border border-white rounded mt-8 text-white flex flex-col items-center">
      <h1 className="text-xl text-center">Google Meet Clone</h1>
      <div className="flex flex-col items-center mt-3 w-full">
        <input
          className="text-black text-lg p-2 rounded w-9/12 mb-3"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e?.target?.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>
      <span className="my-3 text-xl">--------------- OR ---------------</span>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onClick={createAndJoin}
      >
        Create a new room
      </button>
    </div>
  );
}

