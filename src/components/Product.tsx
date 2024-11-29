import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface ProductType {
  ProductName: string;
  ProductImage: string;
  SellerName: string;
}

const Product: React.FC<ProductType> = ({ ProductName, ProductImage, SellerName }) => {
  return (
    <Card sx={{ width: '100%', height: '35vh'}}>
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                <img src={ProductImage} alt={ProductName} style={{ height: '20vh', maxHeight: '20vh', marginRight: '10px' }} />
                </Box>
          <Typography gutterBottom variant="h5" component="div">
          {ProductName?.slice(0, 25)}{ProductName.length > 25 ? '...' : ''}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {SellerName}
          </Typography>
        </CardContent>
    </Card>
  );
};

export default Product;