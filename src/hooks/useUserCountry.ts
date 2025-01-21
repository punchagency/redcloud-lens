import { useCallback, useState } from 'react';
import { allowedCountries } from '../utils/data';

const useUserCountry = () => {
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  interface ReverseGeocodeResponse {
    countryName: string;
  }

  const fetchCountry = useCallback(async (latitude: number, longitude: number): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch country data');
      }

      const data: ReverseGeocodeResponse = await response.json();
      const fetchedCountry = data.countryName;

      if (allowedCountries.includes(fetchedCountry)) {
        setCountry(fetchedCountry);
      } else {
        setCountry('Nigeria');
      }
    } catch (err) {
      setError('Failed to fetch country data.');
    }
  }, []);

  const getUserCountry = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchCountry(latitude, longitude);
      },
      (err) => {
        setError(`Geolocation error: ${err.message}`);
      }
    );
  }, [fetchCountry]);

  return { country, error, getUserCountry };
};

export default useUserCountry;