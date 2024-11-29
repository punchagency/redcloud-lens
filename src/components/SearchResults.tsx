import { Grid2 } from "@mui/material";
import { ProductType } from "../types/product";
import Product from "./Product";

export const SearchResults: React.FC<{ results: ProductType[] }> = ({ results }) => {
  return (
    <Grid2 container spacing={2} sx={{ my: 2}}>
      {results?.map((product, index) => (
        <Grid2 size={4} key={product.ProductID}>
          <Product {...product} />
        </Grid2>
      ))}
    </Grid2>
  );
}