import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { ProductType } from '../types/product';
import { formatMoney } from '../utils/helpers';

const Product: React.FC<ProductType> = ({
  brand,
  brand_or_manufacturer,
  category_name,
  country,
  hs_record_id,
  last_price_update_at,
  manufacturer,
  product_creation_date,
  product_id,
  product_name,
  product_price,
  product_status,
  quantity,
  salable_quantity,
  seller_group,
  seller_id,
  seller_name,
  sku,
  stock_status,
  top_category,
  images,
  product_image,
}) => {
  const displayImage = images && images.length > 0 ? images[0] : product_image;

  return (
    <Card sx={{ width: '100%', height: '40vh' }}>
      <CardContent>
        {displayImage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={displayImage}
              alt={product_name}
              style={{ height: '20vh', maxHeight: '20vh', marginRight: '10px' }}
            />
          </Box>
        )}
        <Typography gutterBottom variant="h6" component="div">
          {product_name?.slice(0, 50)}
          {product_name?.length > 50 ? '...' : ''}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {category_name} - {brand}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {seller_name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {formatMoney(product_price)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;