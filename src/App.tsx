import { useEffect, useRef } from 'react';
import SimplePeer from 'simple-peer';
import './App.css';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<SimplePeer.Instance | null>(null);

  useEffect(() => {
    // Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Initialize peer
        const peer = new SimplePeer({
          initiator: true,
          trickle: false,
          stream: stream
        });

        peer.on('signal', data => {
          // Send signal data to the server
          fetch('YOUR_SIGNALING_SERVER_ENDPOINT', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
        });

        peer.on('connect', () => {
          console.log('Peer connected');
        });

        peer.on('error', err => {
          console.error('Peer error:', err);
        });

        peerRef.current = peer;
      })
      .catch(error => {
        console.error('Error accessing media devices.', error);
      });

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <video ref={videoRef} autoPlay playsInline muted className="App-video" />
        <p>Streaming video to the endpoint...</p>
      </header>
    </div>
  );
}

export default App;