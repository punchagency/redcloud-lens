import ClearIcon from '@mui/icons-material/Clear';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SendIcon from '@mui/icons-material/Send';
import { Box, Chip, Container, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { ProductType } from '../types/product';
import ProductCategory from './ProductCategory';
import ProductsLoading from './ProductsLoading';
import { SearchResults } from './SearchResults';

interface ChatScreenProps {
  results: {
    conversationId: string,
    message: string,
    query: string,
    sqlQuery: string,
    suggestedQries: string[],
    resultAnalysis: string,
    analyticsQueries: string,
    products: ProductType[]
  },
  image: string | ArrayBuffer;
  prompt: string;
  matchesLoading: boolean;
  error: string | null;
  responseMessage: string | null;
  handleGetNLPMatches: (text: string, image?: string) => void;
}

const ChatScreen = ({ results, image, prompt, matchesLoading, handleGetNLPMatches, responseMessage }: ChatScreenProps) => {
  const [messages, setMessages] = useState<string[]>([prompt]);
  const [chatData, setChatData] = useState<{ prompt: string; suggestedQueries: string[]; resultAnalysis?: string; image?: string; responseMessage: string | null; data: ProductType[] }[]>([]);
  const [input, setInput] = useState<string>('');
  const [newImage, setImage] = useState<string | ArrayBuffer | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRefNew = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = () => {
    if (input.trim() || newImage) {
      const newMessage = { prompt: input, image: newImage as string || '', data: [], responseMessage: '', suggestedQueries: [], resultAnalysis: '' };
      setMessages((prevMessages) => [...prevMessages, input]);
      setChatData((prevChatData) => [...prevChatData, newMessage]);
      setInput('');
    }
  };

  const handleSubmitSearch = () => {
    if (input || newImage) {
      handleSendMessage();
      handleGetNLPMatches(input, newImage as string || '');
      setInput('');
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

   useEffect(() => {
    if (!results) return;
  
    const { products, query, suggestedQries, resultAnalysis } = results;
  
    const newResults = products?.map((result) => ({
      ...result,
      product_image: '8136031.png',
    }));
  
    setChatData((prevChatData) => {
      const lastChatData = prevChatData[prevChatData.length - 1] || {};
      return [
        ...prevChatData.slice(0, prevChatData.length - 1),
        {
          prompt: query,
          data: newResults,
          image: lastChatData.image || (image as string) || '',
          suggestedQueries: suggestedQries,
          responseMessage: responseMessage || '',
          resultAnalysis: resultAnalysis,
        },
      ];
    });
  
    setInput('');
  }, [results, image, responseMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatData]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setImage(null);
      handleGetNLPMatches(input);
      handleSendMessage();
    }
  };

  const handleCategoryClick = (category: string) => {
    const newMessage = { prompt: category, image: newImage as string || '', data: [], responseMessage: '', suggestedQueries: [], resultAnalysis: '' };
    setMessages((prevMessages) => [...prevMessages, category]);
    setChatData((prevChatData) => [...prevChatData, newMessage]);
    handleGetNLPMatches(category);
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 0 }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }} ref={chatContainerRef}>
        {chatData.map((data, index) => (
          <Box sx={{ paddingBottom: 2 }} key={index}>
            {data.prompt && (
              <Stack direction="column" alignItems="flex-end" justifyContent="flex-end" spacing={1}>
                <Chip label={data.prompt} sx={{ marginBottom: 1, width: 'max-content' }} />
              </Stack>
            )}
            {data.image && (
              <Stack direction="column" alignItems="flex-end" justifyContent="flex-end" spacing={1}>
                <img src={data.image} alt="Uploaded" style={{ height: '100%', maxHeight: '50px', marginRight: '10px' }} />
              </Stack>
            )}
            {data?.suggestedQueries?.length > 0 && (
              chatData?.length - 1 === index && matchesLoading ? null : (
                <ProductCategory
                  categories={data.suggestedQueries}
                  onCategoryClick={handleCategoryClick}
                />
              )
            )}
            {data?.resultAnalysis && data.resultAnalysis.length > 0 && (
              chatData?.length - 1 === index && matchesLoading ? null : (
                <Typography variant="subtitle1" color="primary" sx={{ marginBottom: 1, width: '100%', textAlign: 'left' }}>
                  {data.resultAnalysis}
                </Typography>)
            )}
            {!(matchesLoading && index === chatData.length - 1) && data.data.length > 0 && (
              <SearchResults results={data.data} />
            )}
            {data.responseMessage && data.data.length === 0 && !matchesLoading && (
              <Stack direction="column" alignItems="flex-start" justifyContent="flex-start" spacing={1}>
                <Chip
                  color="primary"
                  label={data.responseMessage === 'success' ? 'Sorry we are not able to find a result' : data.responseMessage}
                  sx={{ marginBottom: 1, width: 'max-content' }}
                />
              </Stack>
            )}
          </Box>
        ))}
        {matchesLoading && <ProductsLoading />}
      </Box>

      <Box sx={{ display: 'flex', padding: 2, borderTop: '1px solid #ccc', position: 'sticky', bottom: 0, backgroundColor: 'white' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask follow-up..."
          sx={{ marginRight: 1 }}
          onKeyDown={handleKeyDown}
          InputProps={{
                  startAdornment: newImage && (
              <InputAdornment position="start">
                <Stack direction="row" alignItems="center">
                  <img src={newImage as string} alt="Uploaded" style={{ height: '100%', maxHeight: '50px', marginRight: '10px' }} />
                  <IconButton
                    color="secondary"
                    onClick={() => setImage(null)}
                    size="small"
                    sx={{ marginLeft: '5px' }}
                  >
                    <ClearIcon/>
                  </IconButton>
                </Stack>
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
                    ref={fileInputRefNew}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton color="primary" component="span">
                      <InsertPhotoIcon />
                    </IconButton>
                  </label>
                  <IconButton color="primary" onClick={handleSubmitSearch}>
                    <SendIcon />
                  </IconButton>
                </Stack>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Container>
  );
};

export default ChatScreen;