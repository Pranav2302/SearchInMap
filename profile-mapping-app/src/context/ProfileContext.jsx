import { createContext, useState, useEffect, useContext } from 'react';
import { getProfiles, createProfile, updateProfile, deleteProfile } from '../services/api';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  // Fetch profiles with search and filters
  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const params = { search: searchTerm, ...filters };
      const data = await getProfiles(params);
      setProfiles(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch profiles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load profiles on initial render and when search/filters change
  useEffect(() => {
    fetchProfiles();
  }, [searchTerm, filters]);

  // Add a new profile
  const addProfile = async (profileData) => {
    try {
      setLoading(true);
      const newProfile = await createProfile(profileData);
      setProfiles([...profiles, newProfile]);
      return newProfile;
    } catch (err) {
      setError('Failed to add profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update existing profile
  const editProfile = async (id, profileData) => {
    try {
      setLoading(true);
      const updated = await updateProfile(id, profileData);
     
      setProfiles(profiles.map(p => p._id === id ? updated : p));
      
      if (selectedProfile?._id === id) {
        setSelectedProfile(updated);
      }
      
      return updated;
    } catch (err) {
      setError('Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a profile
  const removeProfile = async (id) => {
    try {
      setLoading(true);
      await deleteProfile(id);
   
      setProfiles(profiles.filter(p => p._id !== id));
      
      
      if (selectedProfile?._id === id) {
        setSelectedProfile(null);
      }
    } catch (err) {
      setError('Failed to delete profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    profiles,
    loading,
    error,
    selectedProfile,
    searchTerm,
    filters,
    setSelectedProfile,
    setSearchTerm,
    setFilters,
    addProfile,
    editProfile,
    removeProfile,
    refreshProfiles: fetchProfiles
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfiles = () => useContext(ProfileContext);
