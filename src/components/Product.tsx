import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { ProductType } from '../types/product';

const Product: React.FC<ProductType> = ({ ProductName, ProductImage, CategoryName, ProductPrice }) => {
  return (
    <Card sx={{ width: '100%', height: '40vh'}}>
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                <img src={ProductImage} alt={ProductName} style={{ height: '20vh', maxHeight: '20vh', marginRight: '10px' }} />
                </Box>
          <Typography gutterBottom variant="h5" component="div">
          {ProductName?.slice(0, 50)}{ProductName.length > 50 ? '...' : ''}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {CategoryName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ${ProductPrice}
          </Typography>
          </Stack>
        </CardContent>
    </Card>
  );
};

export default Product;