import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import SeachIcon from '@mui/icons-material/Search';

interface SearchSuggestion {
    title: string;
    onClick: () => void;
    startIcon: JSX.Element;
  }

  export const searchSuggestions: SearchSuggestion[] = [
    {
      title: 'Best Sellers of Coca-Cola',
      onClick: () => console.log('Search by Image'),
      startIcon: <ModelTrainingIcon />,
    },
    {
      title: 'Fanta Flavors',
      onClick: () => console.log('Model Training'),
      startIcon: <SeachIcon />,
    },
    {
      title: 'Sprite Flavors',
      onClick: () => console.log('Mike Tyson Inspired Products'),
      startIcon: <ModelTrainingIcon />,
    },
    { 
      title: 'Coke Zero',
      onClick: () => console.log('Drinks For The Weekend'),
      startIcon: <SeachIcon />,
    },
  ];

  export const productsSample = [
    {
      name: 'Mike Tyson Punch-Out!!',
      image: 'https://images.unsplash.com/photo-1612831966801-7b2e5f2c9d8b',
      description: 'Mike Tyson Punch-Out!! is a boxing video game for the Nintendo Entertainment System (NES) developed and published by Nintendo in 1987.'
      },
      {
      name: 'Mike Tyson Mysteries',
      image: 'https://images.unsplash.com/photo-1612831966801-7b2e5f2c9d8b',
      description: 'Mike Tyson Mysteries is an American adult animated television series, and the first to be produced by Warner Bros. Animation for Adult Swim.'
      },
      {
      name: 'Mike Tyson',
      image: 'https://images.unsplash.com/photo-1612831966801-7b2e5f2c9d8b',
      description: 'Michael Gerard Tyson (born June 30, 1966) is an American former professional boxer who competed from 1985 to 2005.'
      },
      {
      name: 'Mike Tyson: Undisputed Truth',
      image: 'https://images.unsplash.com/photo-1612831966801-7b2e5f2c9d8b',
      description: 'Mike Tyson: Undisputed Truth is a 2013 American one'
      },
      { 
      name: 'Mike Tyson Mysteries',
      image: 'https://images.unsplash.com/photo-1612831966801-7b2e5f2c9d8b',
      description: 'Mike Tyson Mysteries is an American adult animated television series, and the first to be produced by Warner Bros. Animation for Adult Swim.'
      },
      {
      name: 'Mike Tyson',
      image: 'https://images.unsplash.com/photo-1612831966801-7b2e5f2c9d8b',
      description: 'Michael Gerard Tyson (born June 30, 1966) is an American former professional boxer who competed from 1985 to 2005.'
      }
  ]