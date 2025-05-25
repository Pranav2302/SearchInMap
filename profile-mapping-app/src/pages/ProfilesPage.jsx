import { useState } from 'react';
import Layout from '../components/layout/Layout';
import ProfileList from '../components/profile/ProfileList';
import MapView from '../components/map/MapView';
import SearchFilter from '../components/common/SearchFilter';

export default function ProfilesPage() {
  const [mapVisible, setMapVisible] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null); // Add this state
  
  // Add this function to handle profile selection
  const handleShowOnMap = (profile) => {
    if (selectedProfile && selectedProfile._id === profile._id) {
      // If same profile is selected, deselect it
      setSelectedProfile(null);
    } else {
      // Select new profile
      setSelectedProfile(profile);
    }
  };
  
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Profiles</h1>
      
      <SearchFilter />
      
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setMapVisible(!mapVisible)}
          className="btn btn-secondary"
        >
          {mapVisible ? 'Hide Map' : 'Show Map'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`${mapVisible ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <ProfileList 
            onShowOnMap={handleShowOnMap} // Pass the function
            selectedProfileId={selectedProfile?._id} // Pass selected profile ID
          />
        </div>
        
        {mapVisible && (
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <MapView 
                selectedProfile={selectedProfile} // Pass selected profile
                onProfileSelect={setSelectedProfile} // Pass setter function
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}