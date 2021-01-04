import { API_OPERATION } from 'avcore';
import { useEffect, useRef, useState } from 'react';
import { cloudClient} from '../../App';

interface Iprops {
    streamId: string;
  }

export const Subscribe = (props: Iprops) => {
    const Splayer = useRef<HTMLVideoElement>(null);
    const [subscribeId, setsubscribeId] = useState(props.streamId)
    
    useEffect(() => {
      setsubscribeId(props.streamId)
    }, [props]);

    const API_Subcribe = () => {
        (async function () {
            const stream = subscribeId;
            // const kinds=['audio','video'] //can be also ['audio'] or ['video'] only;
            const client = await cloudClient.create(API_OPERATION.SUBSCRIBE,stream,{});
            client.on('bitRate',({bitRate,kind})=>{
                console.log(`current subscribe bitrate for ${kind} track is ${bitRate}`)
            }).on('connectionstatechange',({state})=>{
                  console.log(`current transport connection state is ${state}`)
            })
            const mediaStream= await client.subscribe();
                        
            if (Splayer.current && mediaStream) {
                Splayer.current.srcObject = mediaStream;
              }
            // startPlaying();
        })()
    }
    
      return (
          <>
            <button onClick={API_Subcribe}>Subscribe</button>
            <video ref={Splayer} muted autoPlay playsInline />
          </>
      )
}