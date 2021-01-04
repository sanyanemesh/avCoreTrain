import React, { useEffect, useState } from 'react';
import { CloudClient } from 'avcore/client';
import  {Publish}  from './components/publish';
import {PlayerComponent} from './components/player';
import { token, client, tokenEx, clientEx } from './constants'

import './App.css';

export const clientToken = token;
export const cloudClient = new CloudClient(client, clientToken);

const initmediaDevicesStream = async () => {
  const mediaDevicesStream = await navigator.mediaDevices.getUserMedia(
    {video: true, audio: true}
  )
  return mediaDevicesStream
}

function App() {
  const [ready, setReady] = useState<MediaStream | null>(null);

  useEffect(() => {
    initmediaDevicesStream().then(function(stream) {
      return setReady(stream)
    })
  },[])
  
  return (
    <div className="App">
      <header className="App-header">
        <p>Training</p>
      </header>
      <PlayerComponent stream={ready} />
      <Publish />
    </div>
  );
}

export default App;
