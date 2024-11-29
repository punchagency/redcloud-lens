import { Grid2 } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

interface MediaProps {
  loading?: boolean;
}

function Media(props: MediaProps) {
  const { loading = false } = props;

  return (
    <Grid2 container spacing={2}>
      {(loading ? Array.from(new Array(3)) : []).map((item, index) => (
        <Grid2 size={4} key={index}>
        <Box key={index} sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
          {item ? (
            <img
              style={{ width: '100%', height: 218 }}
              alt={item.title}
              src={item.src}
            />
          ) : (
            <Skeleton variant="rectangular" width={'100%'} height={118} />
          )}
          {item ? (
            <Box sx={{ pr: 2 }}>
              <Typography gutterBottom variant="body2">
                {item.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: 'block', color: 'text.secondary' }}
              >
                {item.channel}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {`${item.views} • ${item.createdAt}`}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
        </Grid2>
      ))}
    </Grid2>
  );
}

export default function ProductsLoading() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Media loading />
    </Box>
  );
}
