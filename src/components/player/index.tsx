import { useEffect, useRef } from "react";

interface IProps {
    stream: MediaStream | null;
  }
  
  export const PlayerComponent = ({ stream }: IProps) => {
    const player = useRef<HTMLVideoElement>(null);
    const streamReady = (stream !== null)
  
    useEffect(() => {
      if (player.current && stream) {
        player.current.srcObject = stream;
      }
      
    }, [streamReady]);
  
    return (
      <video ref={player} muted autoPlay playsInline />
    );
  };
  