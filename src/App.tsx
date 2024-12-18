import { InsertPhoto as InsertPhotoIcon, Search as SearchIcon } from '@mui/icons-material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, Button, CircularProgress, Container, Grid2, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import ChatScreen from './components/ChatScreen';
import ProductCategory from './components/ProductCategory';
import ProductsLoading from './components/ProductsLoading';
import SearchCard from './components/SearchCard';
import { SearchResults } from './components/SearchResults';
import { ProductType } from './types/product';
import { searchSuggestions } from './utils/data';

const App: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<ProductType[] | null>(null);
  const [matchesLoading, setMatchesLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<ProductType[]>([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        clearPreviousState();
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPreviousState = () => {
    setError(null);
    setResponse(null);
    setMatches(null);
    setSearchText('');
    setResults([]);
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
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();

      if (data?.result?.label) {
        setResponse(data.result.label);
      } else {
        setError(data?.message || 'No label found');
      }
    } catch (error) {
      setError('Error sending image');
    } finally {
      setLoading(false);
    }
  };

  const handleGetNLPMatches = async (searchText: string, product_image: string = "", limit: number = 10) => {
    setMatchesLoading(true);
    setFirstLoad(false);
    setMatches(null);
    try {
      const payload = {
        query: searchText,
        product_image: product_image? product_image?.replace(/^data:image\/\w+;base64,/, ""): undefined,
        limit,
      };

      const token = process.env.REACT_APP_MATCHED_TOKEN;
      const response = await fetch(process.env.REACT_APP_NLP_URL as string, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setMatches(data?.results || []);
    } catch (error) {
      console.error('Error fetching matches:', error);
      setMatches(null);
      setError('Error fetching matches');
    } finally {
      setMatchesLoading(false);
    }
  };

  const handleSubmitSearch = () => {
    setSearchClicked(true);
    if (searchText || image) {
      handleGetNLPMatches(searchText, image as string || '');
    }

    setResults([]);
  };

  const handleClearImage = () => {
    setImage(null);
    clearPreviousState();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (response && searchClicked) {
      handleGetNLPMatches(searchText, response);
      setSearchClicked(false);
    }
  }, [response, searchText, searchClicked]);

  useEffect(() => {
    if (matches) {
      setResults(matches || []);
    }
  }, [matches]);

  return (
    <Container className="App">
      {!firstLoad &&
        <ChatScreen results={results?.map((mt) => ({
          ...mt,
          product_image: image ? image as string : '8136031.png',
        }))} image={image || ''} prompt={searchText} matchesLoading={matchesLoading} error={error} handleGetNLPMatches={handleGetNLPMatches} />
      }
      {firstLoad && (
        <Grid2 container spacing={2}>
          <Grid2 size={12} sx={{
            mt: '15vh'
          }}>
            <Typography variant="h4" component="h1" gutterBottom>
              RedCloud Lens
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Find the products for your business
            </Typography>
            <TextField
              multiline
              rows={5}
              fullWidth
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ marginBottom: 5 }}
              placeholder="Upload an image"
              InputProps={{
                startAdornment: image && (
                  <InputAdornment position="start">
                    <img src={image as string} alt="Uploaded" style={{ height: '100%', maxHeight: '100px', marginRight: '10px' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Stack direction="row">
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
                      <Button size="small" color="primary" variant="contained" onClick={handleSubmitSearch} disabled={loading} startIcon={<SearchIcon />}>
                        {loading ? <CircularProgress size={24} /> : 'Search'}
                      </Button>
                    </Stack>
                  </InputAdornment>
                ),
              }}
            />
          </Grid2>
          <Grid2 size={12}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Typography variant="h6" component="h2" gutterBottom>
                Trending Searches
              </Typography>
              <IconButton onClick={handleClearImage} disabled={loading}>
                <RestartAltIcon />
              </IconButton>
            </Stack>
          </Grid2>
          {!matches && !matchesLoading && searchSuggestions?.map((suggestion, index) => (
            <SearchCard key={index} {...suggestion} onClick={() => {
              setSearchText(suggestion.title);
              handleGetNLPMatches(suggestion.title);
            }} />
          ))}
          <Grid2 size={12}>
            <Stack direction="column" spacing={2} alignItems="flex-start">
              <Typography variant="h6" component="h2" gutterBottom>
                Categories
              </Typography>
              <ProductCategory />
            </Stack>
          </Grid2>
          <Grid2 size={12}>
            <Box sx={{ mt: 4 }}>
              {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
              {matchesLoading && <ProductsLoading />}
              {results && results?.length === 0 && !matchesLoading && !loading && (image || searchText) && <Typography>No matches found</Typography>}
            </Box>
          </Grid2>

          <Grid2 size={12}>
            <SearchResults results={results?.map((mt) => ({
              ...mt,
              product_image: image ? image as string : '8136031.png',
            }))} />
          </Grid2>
        </Grid2>
      )}
    </Container>
  );
}

export default App;