import axios from 'axios';

// Using OpenStreetMap Nominatim for geocoding
const GEOCODING_URL = 'https://nominatim.openstreetmap.org/search';
const DEFAULT_LOCATION = [51.505, -0.09]; // London as default

export const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(GEOCODING_URL, {
      params: {
        q: address,
        format: 'json',
        limit: 1,
      },
      headers: {
        'Accept-Language': 'en',
      },
    });
    
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    }
    
    throw new Error('Address not found');
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

export const getDefaultLocation = () => DEFAULT_LOCATION;