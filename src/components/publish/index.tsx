import { API_OPERATION } from 'avcore';
import { Utils} from 'avcore/client';
import { useState } from 'react';
import { cloudClient } from '../../App';
import { Subscribe } from '../subscribe';

export const Publish = () => {
    const [streamID, setStreamID] = useState<string>('');

    const API_Publish = () => {
      (async function () {
        const stream=Math.random().toString(36).substr(2) //some random string;
        const kinds=['audio','video'] //can be also ['audio'] or ['video'] only;
        const isScreenShare=false; //set true for screen share stream
        const simulcast=!isScreenShare; //google chrome has many issues for screen share simulcast
        const mediaStream=await Utils.getUserMedia({
            video:kinds.includes('video'),
            audio:kinds.includes('audio')
        },isScreenShare); //you can receive any stream from navigator.mediaDevices directly w/o our utils
        const client = await cloudClient.create(API_OPERATION.PUBLISH,stream,{
            
            simulcast
        });
        client.on('bitRate',({bitRate,kind})=>{
            console.log(`current publish bitrate for ${kind} track is ${bitRate}`)
        }).on('connectionstatechange',({state})=>{
            console.log(`current transport connection state is ${state}`)
        }).publish(mediaStream);
        setStreamID(stream);
    })()
    }

      return (
          <>
           
            {streamID.length !== 0 
               ? <span>Published <Subscribe streamId={streamID}/></span>
               : <span>
                    <button onClick={API_Publish}>Publish</button>
                    <strong> Please Publish stream </strong>
                 </span>
            }
          </>
      )
}
