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
import { Categories, searchSuggestions } from './utils/data';

const App: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<{
    conversationId: string,
    message: string,
    query: string,
    sqlQuery: string,
    suggestedQries: string[],
    resultAnalysis: string,
    analyticsQueries:string,
    products: ProductType[]
  } | null>(null);
  const [matchesLoading, setMatchesLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<{conversationId: string,
  message: string,
  query: string,
  sqlQuery: string,
  suggestedQries: string[],
  resultAnalysis: string,
  analyticsQueries:string,
  products: ProductType[]}>({
    conversationId: '',
    message: '',
    query: '',
    sqlQuery: '',
    suggestedQries: [],
    resultAnalysis: '',
    analyticsQueries:'',
    products: []
  });
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
    setResults({
      conversationId: '',
      message: '',
      query: '',
      sqlQuery: '',
      suggestedQries: [],
      resultAnalysis: '',
      analyticsQueries:'',
      products: []
    });
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
        conversation_id: matches?.conversationId || undefined,
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
      if (data) {
        const formattedResults = data?.results?.map((result: any) => ({
          ...result,
          product_image: product_image || '8136031.png',
        }));
        setMatches(
          {products: formattedResults,
           conversationId: data?.conversation_id,
            message: data?.message,
            query: data?.query,
            sqlQuery: data?.sql_query,
            suggestedQries: data?.suggested_queries,
            resultAnalysis: data?.result_analysis,
            analyticsQueries: data?.analytics_queries
          });
        setResponseMessage(data?.message || '');
      }
    } catch (error) {
      setMatches(null);
      setError('Error fetching matches');
      setResponseMessage((error as Error).message || 'Error fetching matches');
    } finally {
      setMatchesLoading(false);
    }
  };

  const handleSubmitSearch = () => {
    setSearchClicked(true);
    if (searchText || image) {
      handleGetNLPMatches(searchText, image as string || '');
    }

    setResults({
      conversationId: '',
      message: '',
      query: '',
      sqlQuery: '',
      suggestedQries: [],
      resultAnalysis: '',
      analyticsQueries:'',
      products: []
    }
    );
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
        setResults(matches);
      }
    }, [matches?.products]);

    const handleSelectSuggestions = (suggestion: string) => {
      setSearchText(suggestion);
      handleGetNLPMatches(suggestion);
    }
  
  return (
    <Container className="App">
      {!firstLoad &&
        <ChatScreen responseMessage={responseMessage} results={results} image={image || ''} prompt={searchText} matchesLoading={matchesLoading} error={error} handleGetNLPMatches={handleGetNLPMatches} />
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
                      <Button size="small" color="primary" variant="contained" onClick={handleSubmitSearch} disabled={matchesLoading} startIcon={<SearchIcon />}>
                        {matchesLoading ? <CircularProgress size={24} /> : 'Search'}
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
              <IconButton onClick={handleClearImage} disabled={matchesLoading}>
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
              <ProductCategory categories={Categories?.map((cat)=> cat['Category Name'])} onCategoryClick={handleSelectSuggestions}/>
            </Stack>
          </Grid2>
          <Grid2 size={12}>
            <Box sx={{ mt: 4 }}>
              {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
              {matchesLoading && <ProductsLoading />}
              {results && results?.products?.length === 0 && !matchesLoading && (image || searchText) && <Typography>No matches found</Typography>}
            </Box>
          </Grid2>

          <Grid2 size={12}>
            <SearchResults results={results?.products?.map((mt) => ({
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