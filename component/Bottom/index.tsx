import React from 'react';
import { Mic, Video, PhoneOff, MicOff, VideoOff } from 'lucide-react';

// Define prop types
interface BottomProps {
  muted: boolean;
  playing: boolean;
  toggleAudio: () => void;
  toggleVideo: () => void;
  leaveRoom: () => void;
}

// Bottom component
const Bottom: React.FC<BottomProps> = ({ muted, playing, toggleAudio, toggleVideo, leaveRoom }) => {
  return (
    <div className="absolute flex justify-between bottom-5 left-0 right-0 mx-auto w-72">
      <div
        className={`p-4 rounded-full text-white cursor-pointer ${muted ? 'bg-buttonPrimary' : 'bg-secondary'
          }`}
        onClick={toggleAudio}
      >
        {muted ? (
          <MicOff size={55} />
        ) : (
          <Mic size={55} />
        )}
      </div>
      <div
        className={`p-4 rounded-full text-white cursor-pointer ${playing ? 'bg-secondary' : 'bg-buttonPrimary'
          }`}
        onClick={toggleVideo}
      >
        {playing ? (
          <Video size={55} />
        ) : (
          <VideoOff size={55} />
        )}
      </div>
      <div
        className="p-4 rounded-full text-white cursor-pointer bg-secondary"
        onClick={leaveRoom}
      >
        <PhoneOff size={55} />
      </div>
    </div>
  );
};

export default Bottom;

