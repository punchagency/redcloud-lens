import { InsertPhoto as InsertPhotoIcon, Search as SearchIcon } from '@mui/icons-material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, Button, CircularProgress, Container, Grid2, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import ProductsLoading from './components/ProductsLoading';
import SearchCard from './components/SearchCard';
import { SearchResults } from './components/SearchResults';
import { searchSuggestions } from './utils/data';

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<any>(null);
  const [matchesLoading, setMatchesLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setError(null); // Clear any previous error
        setResponse(null); // Clear previous response
        setMatches(null); // Clear previous matches
        setSearchText(''); // Clear previous search text
        setResults([]); // Clear previous results
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

  // const handleGetMatches = async (label: string, limit: number = 10) => {
  //   setMatchesLoading(true);
  //   setMatches(null);
  //   try {
  //     const token = process.env.REACT_APP_MATCHED_TOKEN; // Replace with your actual token
  //     const response = await fetch(process.env.REACT_APP_MATCHED_URL as string, {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         label: label?.replace('-', ' '),
  //         limit
  //       }),
  //     });

  //     const data = await response.json();
  //     setMatches(data);
  //   } catch (error) {
  //     console.error('Error fetching matches:', error);
  //     setMatches('Error fetching matches');
  //   } finally {
  //     setMatchesLoading(false);
  //   }
  // };

  const handleGetNLPMatches = async (searchText: string, productName: string = "", limit: number = 10) => {
    setMatchesLoading(true);
    setMatches(null);
    try {

      let payload = {};

      if(searchText) {
        payload = {
          query: searchText,
          limit
        }
      }

      if(productName) {
        payload = {
          query: searchText,
          product_name: productName,
          limit
        }
      }

      const token = process.env.REACT_APP_MATCHED_TOKEN; // Replace with your actual token
      const response = await fetch(process.env.REACT_APP_NLP_URL as string, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload
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
  }

  const handleSubmitSearch = () => {
    if (searchText && !image) {
      handleGetNLPMatches(searchText);
    }

   if (image) {
      handleSendImage();
    }

    setResults([]);
  }

  const handleClearImage = () => {
    setImage(null);
    setResponse(null);
    setMatches(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setSearchText(''); // Clear previous search text
    setResults([]); // Clear previous results
  };

  useEffect(() => {
    if (response) {
      handleGetNLPMatches(`${searchText}`, `${response}`);
    }
  }, [response, searchText]);


  useEffect(() => {
    if(matches?.data) {
      setResults(matches.data);
    }

    if(matches?.results) {
      setResults(matches.results);
    }

  },[matches])

  return (
    <Container className="App">
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            RedCloud Lens
          </Typography>
          <TextField
            multiline
            rows={5}
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              marginBottom: 5
            }}
            placeholder="Upload an image"
            InputProps={{
              startAdornment: image && (
                <InputAdornment position="start">
                  <img src={image as string} alt="Uploaded" style={{ height: '100%', maxHeight: '100px', marginRight: '10px' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Stack direction='row'>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="icon-button-file"
                      type="file"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" component="span">
                        <InsertPhotoIcon />
                      </IconButton>
                    </label>
                    <Button size='small' color="primary" variant='contained' onClick={handleSubmitSearch} disabled={loading} startIcon={<SearchIcon />}>
                      {loading ? <CircularProgress size={24} /> : 'Search'}
                    </Button>
                  </Stack>
                </InputAdornment>
              ),
            }}
          />
        </Grid2>
        <Grid2 size={12}>
          <Stack direction='row' spacing={2} justifyContent="space-between">
            <Typography variant="h6" component="h2" gutterBottom>
              Trending Searches
            </Typography>
            <IconButton
              onClick={handleClearImage}
              disabled={loading}
            >
              <RestartAltIcon />
            </IconButton>
          </Stack>
        </Grid2>
        {!matches && !matchesLoading && searchSuggestions?.map((suggestion, index) => (
            <SearchCard key={index} {...suggestion} onClick={()=>{
              setSearchText(suggestion.title);
              handleGetNLPMatches(suggestion.title);
            }} />
          ))}
        <Grid2 size={12}>
          <Box sx={{ mt: 4 }}>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            {matchesLoading && <ProductsLoading />}
            {results && results?.length === 0 && !matchesLoading && !loading && <Typography>No matches found</Typography>}
          </Box>
        </Grid2>
        <Grid2 size={12}>
          <SearchResults results={results?.map((mt: { ProductID: string; ProductName: string; ProductImage: string; SellerName: string; }) => ({ ProductID: mt.ProductID, ProductName: mt.ProductName, ProductImage: image? image as string: '8136031.png', SellerName: mt.SellerName }))} />
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default App;