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

  export const Categories = [{
    "Category Name": "Red101 Market"
  }, {
    "Category Name": "Tea \u0026 Infusions"
  }, {
    "Category Name": "Mobile Phones"
  }, {
    "Category Name": "Bar Soap"
  }, {
    "Category Name": "Cookies"
  }, {
    "Category Name": "Deodorant"
  }, {
    "Category Name": "Bath \u0026 Body"
  }, {
    "Category Name": "Water"
  }, {
    "Category Name": "Biscuits"
  }, {
    "Category Name": "Gin"
  }, {
    "Category Name": "Whiskey"
  }, {
    "Category Name": "Liqueurs"
  }, {
    "Category Name": "Pasta \u0026 Noodles"
  }, {
    "Category Name": "Feminine Sanitary Supplies"
  }, {
    "Category Name": "Food"
  }, {
    "Category Name": "Studio Light \u0026 Flash Accessories"
  }, {
    "Category Name": "Seasonings \u0026 Spices"
  }, {
    "Category Name": "Laundry Detergent"
  }, {
    "Category Name": "Laundry Supplies"
  }, {
    "Category Name": "Household Disinfectants"
  }, {
    "Category Name": "Lotions \u0026 Moisturisers"
  }, {
    "Category Name": "Rice"
  }, {
    "Category Name": "Crackers"
  }, {
    "Category Name": "Fizzy Drinks"
  }, {
    "Category Name": "Perfume \u0026 Cologne"
  }, {
    "Category Name": "Hair Extensions"
  }, {
    "Category Name": "Screen Protectors"
  }, {
    "Category Name": "Washing-up Detergent \u0026 Soap"
  }, {
    "Category Name": "Juice"
  }, {
    "Category Name": "Household Insect Repellents"
  }, {
    "Category Name": "Cooking Oils"
  }, {
    "Category Name": "Personal Care"
  }, {
    "Category Name": "Milk"
  }, {
    "Category Name": "Wine"
  }, {
    "Category Name": "Household Supplies"
  }, {
    "Category Name": "Cocktail Mixes"
  }, {
    "Category Name": "Haircare"
  }, {
    "Category Name": "Bleach"
  }, {
    "Category Name": "Conditioner"
  }, {
    "Category Name": "Coffee"
  }, {
    "Category Name": "Skincare"
  }, {
    "Category Name": "Mobile Phone Accessories"
  }, {
    "Category Name": "Baby Formula"
  }, {
    "Category Name": "Baby Food"
  }, {
    "Category Name": "Non-Dairy Milk"
  }, {
    "Category Name": "Liquor \u0026 Spirits"
  }, {
    "Category Name": "Household Cleaning Supplies"
  }, {
    "Category Name": "Sweets \u0026 Chocolate"
  }, {
    "Category Name": "Toilet Cleaners"
  }, {
    "Category Name": "Shampoo"
  }, {
    "Category Name": "Mayonnaise"
  }, {
    "Category Name": "Vodka"
  }, {
    "Category Name": "Petroleum Jelly"
  }, {
    "Category Name": "Fruit-Flavoured Drinks"
  }, {
    "Category Name": "Sports \u0026 Energy Drinks"
  }, {
    "Category Name": "Yoghurt"
  }, {
    "Category Name": "Toiletries"
  }, {
    "Category Name": "Nappies"
  }, {
    "Category Name": "Pesticides"
  }, {
    "Category Name": "Canned \u0026 Powdered Milk"
  }, {
    "Category Name": "Feminine Pads \u0026 Protectors"
  }, {
    "Category Name": "Tomato Paste"
  }, {
    "Category Name": "Body Wash"
  }, {
    "Category Name": "Glass \u0026 Surface Cleaners"
  }, {
    "Category Name": "Prepared Food"
  }, {
    "Category Name": "Herbs \u0026 Spices"
  }, {
    "Category Name": "Appetisers \u0026 Snacks"
  }, {
    "Category Name": "Beer"
  }, {
    "Category Name": "Butter \u0026 Margarine"
  }, {
    "Category Name": "Dishwasher Cleaners"
  }, {
    "Category Name": "Lollipops"
  }, {
    "Category Name": "Flavoured Sparkling Water"
  }, {
    "Category Name": "Powdered Beverage Mixes"
  }, {
    "Category Name": "Foundations \u0026 Concealers"
  }, {
    "Category Name": "Tinned Seafood"
  }, {
    "Category Name": "Cereals \u0026 Granola"
  }, {
    "Category Name": "Hot Chocolate"
  }, {
    "Category Name": "Toners \u0026 Astringents"
  }, {
    "Category Name": "Medicines \u0026 Drugs"
  }, {
    "Category Name": "Healthcare"
  }, {
    "Category Name": "Respiratory Care"
  }, {
    "Category Name": "Vitamins \u0026 Supplements"
  }, {
    "Category Name": "Paper Serviettes"
  }, {
    "Category Name": "Facial Tissues"
  }, {
    "Category Name": "Toilet Paper"
  }, {
    "Category Name": "Kitchen Paper"
  }, {
    "Category Name": "Lighters \u0026 Matches"
  }, {
    "Category Name": "Grain \u0026 Cereals"
  }, {
    "Category Name": "Hair Removal"
  }, {
    "Category Name": "Beverages"
  }, {
    "Category Name": "Air Fresheners"
  }, {
    "Category Name": "Wafers"
  }, {
    "Category Name": "Bread \u0026 Buns"
  }, {
    "Category Name": "Diapering"
  }, {
    "Category Name": "Liquid Hand Soap"
  }, {
    "Category Name": "Hand Sanitisers"
  }, {
    "Category Name": "Adhesive Tapes"
  }, {
    "Category Name": "Yeast"
  }, {
    "Category Name": "Scanners"
  }, {
    "Category Name": "Toner \u0026 Inkjet Cartridges"
  }, {
    "Category Name": "Printers; Photocopiers \u0026 Fax Machines"
  }, {
    "Category Name": "Toothpaste"
  }, {
    "Category Name": "Malt"
  }, {
    "Category Name": "Condoms"
  }, {
    "Category Name": "Rum"
  }, {
    "Category Name": "Bitters"
  }, {
    "Category Name": "Salad Dressings"
  }, {
    "Category Name": "Sugar \u0026 Sweeteners"
  }, {
    "Category Name": "Ketchup"
  }, {
    "Category Name": "Hair Colouring"
  }, {
    "Category Name": "All-Purpose Cleaners"
  }, {
    "Category Name": "Glass Cleaners"
  }, {
    "Category Name": "Muti-surface Cleaners"
  }, {
    "Category Name": "Car Wash Solutions"
  }, {
    "Category Name": "Fruit and Nut Snacks"
  }, {
    "Category Name": "Facial Cleansers"
  }, {
    "Category Name": "Nut Butters"
  }, {
    "Category Name": "Hair Permanents \u0026 Straighteners"
  }, {
    "Category Name": "Candies"
  }, {
    "Category Name": "Baby Bathing"
  }, {
    "Category Name": "Hair Oil"
  }, {
    "Category Name": "Toner \u0026 Inkjet Cartridge Refills"
  }, {
    "Category Name": "Masonry Consumables"
  }, {
    "Category Name": "Flavoured Alcoholic Beverages"
  }, {
    "Category Name": "Mobile Phone Cases"
  }, {
    "Category Name": "Headphones \u0026 Headsets"
  }, {
    "Category Name": "Medical Masks"
  }, {
    "Category Name": "Medical Supplies"
  }, {
    "Category Name": "Popcorn"
  }, {
    "Category Name": "Flour"
  }, {
    "Category Name": "Pastries \u0026 Scones"
  }, {
    "Category Name": "Business \u0026 Industrial"
  }, {
    "Category Name": "Candles"
  }, {
    "Category Name": "Perfumery"
  }, {
    "Category Name": "Antiseptics \u0026 Cleaning Supplies"
  }, {
    "Category Name": "Oats - Grits \u0026 Oatmeal"
  }, {
    "Category Name": "Baby \u0026 Toddler Food"
  }, {
    "Category Name": "Meat; Seafood \u0026 Eggs"
  }, {
    "Category Name": "Cooking \u0026 Baking Ingredients"
  }, {
    "Category Name": "Body Oil"
  }, {
    "Category Name": "USB Flash Drives"
  }, {
    "Category Name": "Conductivity Gels \u0026 Lotions"
  }, {
    "Category Name": "Baby Gift Sets"
  }, {
    "Category Name": "Baby Wipes"
  }, {
    "Category Name": "Salt"
  }, {
    "Category Name": "Baking Powder"
  }, {
    "Category Name": "Skin Insect Repellent"
  }, {
    "Category Name": "Headphones"
  }, {
    "Category Name": "Adult Diaper"
  }, {
    "Category Name": "Cream"
  }, {
    "Category Name": "USB Adapters"
  }, {
    "Category Name": "False Eyelashes"
  }, {
    "Category Name": "Body Powder"
  }, {
    "Category Name": "Face Powders"
  }, {
    "Category Name": "Spirits"
  }, {
    "Category Name": "Baby Cereal"
  }, {
    "Category Name": "Toothbrushes"
  }, {
    "Category Name": "Fabric Refreshers"
  }, {
    "Category Name": "Cement, Mortar \u0026 Concrete Mixes"
  }, {
    "Category Name": "Cement"
  }, {
    "Category Name": " Mortar \u0026 Concrete Mixes"
  }, {
    "Category Name": "Adult Hygienic Wipes"
  }, {
    "Category Name": "Baby and Toddler"
  }, {
    "Category Name": "Towels"
  }, {
    "Category Name": "Contact Lenses"
  }, {
    "Category Name": "Brandy"
  }, {
    "Category Name": "Cheese Puffs"
  }, {
    "Category Name": "LED Light Bulbs"
  }, {
    "Category Name": "Alcoholic Beverages"
  }, {
    "Category Name": "Kitchen Appliance Accessories"
  }, {
    "Category Name": "Wireless Routers"
  }, {
    "Category Name": "Hubs \u0026 Switches"
  }, {
    "Category Name": "Razors \u0026 Razor Blades"
  }, {
    "Category Name": "Crisps"
  }, {
    "Category Name": "Powdered Hand Soap"
  }, {
    "Category Name": "Crafting Adhesives \u0026 Magnets"
  }, {
    "Category Name": "Tequila"
  }, {
    "Category Name": "Corn"
  }, {
    "Category Name": "Dairy Products"
  }, {
    "Category Name": "Wart Removers"
  }, {
    "Category Name": "Mouthwash"
  }, {
    "Category Name": "Condiments \u0026 Sauces"
  }, {
    "Category Name": "Tub \u0026 Tile Cleaners"
  }, {
    "Category Name": "Baby Health"
  }, {
    "Category Name": "Tissue Paper"
  }, {
    "Category Name": "Sugar \u0026 Sweetener"
  }, {
    "Category Name": "Paint"
  }, {
    "Category Name": "Snacks"
  }, {
    "Category Name": "Peas"
  }, {
    "Category Name": "Tinned Beans"
  }, {
    "Category Name": "Couscous"
  }, {
    "Category Name": "Cosmetics"
  }, {
    "Category Name": "Batteries"
  }, {
    "Category Name": "Lip Liner"
  }, {
    "Category Name": "Compressed Skincare-Mask Sheets"
  }]


  export const allowedCountries = ['Nigeria', 'South Africa', 'Argentina', 'Brazil'];