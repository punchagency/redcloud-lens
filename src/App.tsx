import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<any>(null);
  const [matchesLoading, setMatchesLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setError(null); // Clear any previous error
        setResponse(null);
        setMatches(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendImage = async () => {
    if (!image) {
      setError('Please upload an image before sending.');
      return;
    }

    setLoading(true);
    setResponse(null);
    setError(null);
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

      if (data?.result?.label) {
        setResponse(data?.result?.label);
      } else {
        setError(data?.message ? data?.message : 'No label found');
      }
     
    } catch (error) {
      setError('Error sending image');
    } finally {
      setLoading(false);
    }
  };

  const handleGetMatches = async (label: string, limit: number = 10) => {
    setMatchesLoading(true);
    setMatches(null);
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
      console.error('Error fetching matches:', error);
      setMatches('Error fetching matches');
    } finally {
      setMatchesLoading(false);
    }
  };

  const handleClearImage = () => {
    setImage(null);
    setResponse(null);
    setMatches(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (response) {
      handleGetMatches(response);
    }
  }, [response]);

  return (
    <div className="App">
      <div className="App-header">
        <div className='App-Uploader'>
        <h1>RedCloud Lens</h1>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="App-input"
        />
        {response && <p>{response}</p>}
        {image && <img src={image as string} alt="Uploaded" className="App-video" />}
        <div className="App-buttons">
          <button onClick={handleSendImage} disabled={loading} className="App-button">
            {loading ? 'Sending...' : 'Send Image for Identification'}
          </button>
          <button onClick={handleClearImage} disabled={loading} className="App-button">Clear Image</button>
        </div>
        {error && <div className="App-error">{error}</div>}
      
        </div>
        <div className='App-Info'>
        {matchesLoading && <div className="App-matches">Fetching matches...</div>}
        {matches && matches.data?.length === 0 && <div className="App-matches">No matches found</div>}
        {matches?.data?.length > 0 && (
          <div className="App-matches">
            <p>Matches</p>
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
        </div>
      </div>
    </div>
  );
}

export default App;