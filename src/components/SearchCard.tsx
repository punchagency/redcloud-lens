import { Card, CardContent, Grid2, IconButton, Typography } from '@mui/material';
import React from 'react';

interface SearchCardProps {
  title: string;
  onClick: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const SearchCard: React.FC<SearchCardProps> = ({ title, onClick, startIcon, endIcon }) => {
  return (
    <Grid2 size={6}>
    <Card sx={{ borderRadius: 2, boxShadow: 2}} onClick={onClick}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {startIcon && <IconButton>{startIcon}</IconButton>}
        <Typography variant="body2" align="center" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {endIcon && <IconButton>{endIcon}</IconButton>}
      </CardContent>
    </Card>
    </Grid2>
  );
};

export default SearchCard;