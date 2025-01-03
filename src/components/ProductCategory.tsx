import { Box, Tab } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import React from 'react';

interface ProductCategoryProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({ categories, onCategoryClick }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onCategoryClick(categories[newValue]);
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
    </Box>
  );
};

export default ProductCategory;