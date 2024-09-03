import React from 'react';
import ReactPlayer from 'react-player';
import { Mic, MicOff, UserSquare2 } from 'lucide-react';

interface PlayerProps {
  url: MediaStream;
  muted: boolean;
  playing: boolean;
  isActive: boolean;
}

const Player: React.FC<PlayerProps> = ({ url, muted, playing, isActive }) => {
  return (
    <div
      className={`relative overflow-hidden mb-5 h-full ${isActive ? 'rounded-lg' : 'rounded-md h-min w-52 shadow-lg'
        } ${!playing ? 'flex items-center justify-center' : ''}`}
    >
      {playing ? (
        <ReactPlayer
          url={url}
          muted={muted}
          playing={playing}
          width="100%"
          height="100%"
        />
      ) : (
        <UserSquare2 className="text-white" size={isActive ? 400 : 150} />
      )}

      {!isActive && (
        muted ? (
          <MicOff className="text-white absolute right-2 bottom-2" size={20} />
        ) : (
          <Mic className="text-white absolute right-2 bottom-2" size={20} />
        )
      )}
    </div>
  );
};

export default Player;

