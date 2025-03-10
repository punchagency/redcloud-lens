import { Box, CircularProgress, Grid2, Tab, Typography } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import React, { useEffect, useState } from 'react';
import axiosInstance, { endpoints } from '../services/api';
import SearchCard from './SearchCard';

interface HomeCategoryProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
  country: string;
}

interface Product {
  brand_or_manufacturer: string;
  product_id: number;
  country: string;
  sku: string;
  brand: string;
  manufacturer: string;
  product_creation_date: string;
  product_status: string;
  product_name: string;
  product_price: number;
  quantity: number;
  stock_status: string;
  salable_quantity: number;
  category_name: string;
  top_category: string;
  seller_id: number;
  seller_group: string;
  seller_name: string;
  hs_record_id: string;
  last_price_update_at: string;
}

const HomeCategory: React.FC<HomeCategoryProps> = ({ categories, onCategoryClick, country }) => {
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetHomeCategory = async (category: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(`${endpoints.categories}`, {
         category,
         country
      });
      const data = response.data;
      setProducts(data.results as Product[] || []);
    } catch (error) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetHomeCategory(categories[value]);
  }, [value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480, md: '100%' }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
          '& .MuiTabs-indicator': {
            display: 'none',
          },
        }}
      >
        {categories.map((category, index) => (
          <Tab
            key={category}
            label={category}
            sx={{
              backgroundColor: value === index ? 'primary.main' : 'background.paper',
              color: value === index ? 'white' : 'text.primary',
              borderRadius: '16px',
              padding: '6px 12px',
              margin: '4px',
              marginTop: '10px',
              minHeight: 'auto',
              minWidth: 'auto',
              textTransform: 'none',
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
          />
        ))}
      </Tabs>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <Grid2 container spacing={2}>
          {products && products.map((product: Product, index) => (
              <SearchCard title={product.product_name?.slice(0,30)} key={index} onClick={() => {
                onCategoryClick(product.product_name);
              }} />
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default HomeCategory;