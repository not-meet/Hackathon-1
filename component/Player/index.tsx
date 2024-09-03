import React, { useEffect, useRef } from 'react';
import { Mic, MicOff, UserSquare2 } from 'lucide-react';

interface PlayerProps {
  url: MediaStream;
  muted: boolean;
  playing: boolean;
  isActive: boolean;
}

const Player: React.FC<PlayerProps> = ({ url, muted, playing, isActive }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = url;
      if (playing) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [url, playing]);

  return (
    <div
      className={`relative overflow-hidden mb-5 ${isActive ? 'rounded-lg h-full' : 'rounded-md h-min w-52 shadow-lg'} 
        ${!playing ? 'flex items-center justify-center' : ''}`}
    >
      {playing ? (
        <video
          ref={videoRef}
          muted={muted}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
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

