// hooks/useMap.js
import { useState, useEffect } from 'react';

export const useMap = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Replace this with your actual API call
        const response = await fetch('/api/profiles'); // Adjust URL as needed
        
        if (!response.ok) {
          throw new Error(`Failed to fetch profiles: ${response.statusText}`);
        }
        
        const data = await response.json();
        setProfiles(data);
        
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return {
    profiles,
    loading,
    error,
    selectedProfile,
    setSelectedProfile
  };
};