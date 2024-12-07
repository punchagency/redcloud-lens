import { InsertPhoto as InsertPhotoIcon, Search as SearchIcon } from '@mui/icons-material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, Button, CircularProgress, Container, Grid2, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import ProductsLoading from './components/ProductsLoading';
import SearchCard from './components/SearchCard';
import { SearchResults } from './components/SearchResults';
import { ProductType } from './types/product';
import { searchSuggestions } from './utils/data';


const App: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
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

  const handleGetNLPMatches = async (searchText: string, productName: string = "", limit: number = 10) => {
    setMatchesLoading(true);
    setMatches(null);
    try {
      const payload = {
        query: searchText,
        product_name: productName || undefined,
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
    if (searchText && !image) {
      handleGetNLPMatches(searchText);
    }

    if (image) {
      handleSendImage();
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
          <Box sx={{ mt: 4 }}>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            {matchesLoading && <ProductsLoading />}
            {results && results?.length === 0 && !matchesLoading && !loading && <Typography>No matches found</Typography>}
          </Box>
        </Grid2>
        <Grid2 size={12}>
          <SearchResults results={results?.map((mt) => ({
            ProductID: mt.ProductID,
            ProductName: mt.ProductName,
            ProductImage: image ? image as string : '8136031.png',
            CategoryName: mt.CategoryName,
            Country: mt.Country,
            Brand: mt.Brand,
            ProductPrice: mt.ProductPrice,
          }))} />
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default App;