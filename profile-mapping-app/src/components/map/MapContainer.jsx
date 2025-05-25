import React, { useState } from 'react';
import { useMap } from '../../hooks/useMap';
import MapControls from './MapControls';
import MapMarker from './MapMarker';
import ProfileCard from '../profile/ProfileCard'; 

// Helper function to get coordinates
const getCoordinates = (location) => {
  const locationMap = {
    'New York': [40.7128, -74.0060],
    'San Francisco': [37.7749, -122.4194],
    'Chicago': [41.8781, -87.6298],
    'London': [51.5074, -0.1278],
    'Shanghai': [31.2304, 121.4737],
    'Tokyo': [35.6762, 139.6503],
    'Paris': [48.8566, 2.3522],
    'Berlin': [52.5200, 13.4050],
    'Sydney': [-33.8688, 151.2093],
    'Toronto': [43.6532, -79.3832],
    'Pune': [18.5204, 73.8567],
  'Kolhapur': [16.7050, 74.2433],
  'Chennai': [13.0827, 80.2707],
  'Dubai': [25.276987, 55.296249],
  'Germany': [51.1657, 10.4515],
  'New Zealand': [-40.9006, 174.8860],
  'Manali': [32.2396, 77.1887],
  'Egypt': [26.8206, 30.8025]
  };
  return locationMap[location?.city] || [40.7128, -74.0060];
};

// Main MapContainer component
const MapContainer = () => {
  const { profiles, loading, error, selectedProfile, setSelectedProfile } = useMap();
  const [mapCenter, setMapCenter] = useState([20, 0]);
  const [mapZoom, setMapZoom] = useState(2);

  const handleShowOnMap = (profile) => {
    if (selectedProfile?._id === profile._id) {
      // If same profile is selected, deselect it
      setSelectedProfile(null);
      setMapCenter([20, 0]);
      setMapZoom(2);
    } else {
      // Select new profile and center map on it
      setSelectedProfile(profile);
      const coordinates = getCoordinates(profile.location);
      setMapCenter(coordinates);
      setMapZoom(6);
    }
  };

  const handleMarkerClick = (profile) => {
    handleShowOnMap(profile);
  };

  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 1, 10));
  };

  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    setMapCenter([20, 0]);
    setMapZoom(2);
    setSelectedProfile(null);
  };

  const handleShowAll = () => {
    setSelectedProfile(null);
    setMapCenter([20, 0]);
    setMapZoom(2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading profiles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Profile Map Explorer
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profiles List */}
          <div className="lg:col-span-1 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Profiles ({profiles?.length || 0})
            </h2>
            {profiles?.map(profile => (
              <ProfileCard
                key={profile._id || profile.id}
                profile={profile}
                onShowOnMap={handleShowOnMap}
                isSelected={selectedProfile?._id === profile._id || selectedProfile?.id === profile.id}
              />
            ))}
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="relative bg-blue-50 rounded-lg overflow-hidden" style={{ height: '600px' }}>
              <MapControls
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onReset={handleReset}
                onShowAll={handleShowAll}
              />
              
              {/* Simple world map representation */}
              <div 
                className="relative w-full h-full bg-gradient-to-b from-sky-200 to-blue-300"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3e%3cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.3'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100' height='100' fill='url(%23grid)' /%3e%3c/svg%3e")`,
                  transform: `scale(${mapZoom / 2})`,
                  transformOrigin: 'center'
                }}
              >
                {/* Render markers */}
                {profiles?.map(profile => (
                  <MapMarker
                    key={profile._id || profile.id}
                    profile={profile}
                    onClick={handleMarkerClick}
                    isSelected={selectedProfile?._id === profile._id || selectedProfile?.id === profile.id}
                  />
                ))}
              </div>

              {/* Profile details overlay */}
              {selectedProfile && (
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <img
                      src={selectedProfile.photo || 'https://picsum.photos/100/100'}
                      alt={selectedProfile.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{selectedProfile.name}</h3>
                      <p className="text-sm text-gray-600">{selectedProfile.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><strong>Location:</strong> {selectedProfile.location?.city}, {selectedProfile.location?.country}</p>
                    {selectedProfile.phone && (
                      <p><strong>Phone:</strong> {selectedProfile.phone}</p>
                    )}
                    {selectedProfile.description && (
                      <p><strong>About:</strong> {selectedProfile.description}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
