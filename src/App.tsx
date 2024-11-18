import React, { useEffect, useRef, useState } from 'react';
// import snowflake from 'snowflake-sdk';
import './App.css';

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [matches, setMatches] = useState<any>(null);

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
      setLoading(true);
      setResponse(null);
      try {
        const token = process.env.REACT_APP_IMAGE_UPLOAD_TOKEN;
        const base64Image = (image as string).replace(/^data:image\/\w+;base64,/, "");
        const response = await fetch(process.env.REACT_APP_IMAGE_UPLOAD_URL as string, {
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
        setResponse(data?.result?.label);
      } catch (error) {
        console.error('Error sending image:', error);
        setResponse('Error sending image');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGetMatches= async (label: string, limit: number= 10) => {
    if (image) {
      setLoading(true);
      setResponse(null);
      try {
        const token = process.env.REACT_APP_MATCHED_TOKEN; // Replace with your actual token
        const response = await fetch(process.env.REACT_APP_MATCHED_URL as string, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             label: label?.replace('-', ' '),
             limit
          }),
        });
  
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Error sending image:', error);
        setMatches('Error sending image');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClearImage = () => {
    setImage(null);
    setResponse(null);
    setMatches(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  
  useEffect(() => {
    if(response) {
      handleGetMatches(response);
    }
  }, [response]);
  

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className='App-input'
        />
        {image && <img src={image as string} alt="Uploaded" className="App-video" />}
        <div className="App-buttons">
          <button onClick={handleSendImage} disabled={!image || loading} className='App-button'>
            {loading ? 'Sending...' : 'Send Image for Identification'}
          </button>
          <button onClick={handleClearImage} disabled={!image || loading} className='App-button'>Clear Image</button>
        </div>
        {matches?.data?.length > 0 && (
          <div className="App-matches">
            <h2>Matches</h2>
            <ul>
              {matches.data.map((match: any) => (
                <li key={match.ProductID}>
                  <div>{match.ProductName}</div>
                  <div>{match.ProductPrice}</div>
                  <div>{match.SellerName}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;