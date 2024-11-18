import React, { useRef, useState } from 'react';
// import SimplePeer from 'simple-peer';
import './App.css';

function App() {
  // const videoRef = useRef<HTMLVideoElement>(null);
  // const peerRef = useRef<SimplePeer.Instance | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  // useEffect(() => {
  //   // Get user media
  //   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  //     .then(stream => {
  //       if (videoRef.current) {
  //         videoRef.current.srcObject = stream;
  //       }

  //       // Initialize peer
  //       const peer = new SimplePeer({
  //         initiator: true,
  //         trickle: false,
  //         stream: stream
  //       });

  //       peer.on('signal', data => {
  //         // Send signal data to the server
  //         fetch('YOUR_SIGNALING_SERVER_ENDPOINT', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify(data)
  //         });
  //       });

  //       peer.on('connect', () => {
  //         console.log('Peer connected');
  //       });

  //       peer.on('error', err => {
  //         console.error('Peer error:', err);
  //       });

  //       peerRef.current = peer;
  //     })
  //     .catch(error => {
  //       console.error('Error accessing media devices.', error);
  //     });

  //   return () => {
  //     if (peerRef.current) {
  //       peerRef.current.destroy();
  //     }
  //   };
  // }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendImage = async () => {
    if (image) {
      try {
        const token = '-5oiScxMUBi-dSkvfTL5CACV9exnIf_gvjTrYJm0iMcSLRaTZEMw1cTsejdftjkn7UKxJsFyyspOn_x7chi_nw=='; // Replace with your actual token
        const base64Image = (image as string).replace(/^data:image\/\w+;base64,/, "");
        const response = await fetch('https://redcloud-inference-8cae8b3.app.beam.cloud', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64Image
          }),
        });
  
        const data = await response.json();
        console.log('Image identification result:', data);
      } catch (error) {
        console.error('Error sending image:', error);
      }
    }
  };

  const handleClearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              ref={fileInputRef}
         />
        {/* {image ? (
          <img src={image as string} alt="Uploaded" className="App-video" />
        ) : (
          <video ref={videoRef} autoPlay playsInline muted className="App-video" />
        )} */}
        {image && <img src={image as string} alt="Uploaded" className="App-video" />}
        <div className="App-buttons">
          <button onClick={handleSendImage} disabled={!image}>Send Image for Identification</button>
          <button onClick={handleClearImage} disabled={!image}>Clear Image</button>
        </div>
      </header>
    </div>
  );
}

export default App;