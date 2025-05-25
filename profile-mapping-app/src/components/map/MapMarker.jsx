import React from 'react';

// MapMarker component
const MapMarker = ({ profile, onClick, isSelected }) => {
  const coordinates = getCoordinates(profile.location);
  
  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200 ${
        isSelected ? 'scale-110 z-20' : 'z-10'
      }`}
      style={{
        left: `${((coordinates[1] + 180) / 360) * 100}%`,
        top: `${((90 - coordinates[0]) / 180) * 100}%`
      }}
      onClick={() => onClick(profile)}
    >
      <div className={`relative ${isSelected ? 'animate-pulse' : ''}`}>
        <img
          src={profile.photo || 'https://picsum.photos/100/100'}
          alt={profile.name}
          className={`w-10 h-10 rounded-full border-2 shadow-lg object-cover ${
            isSelected ? 'border-red-500' : 'border-white'
          }`}
        />
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-center bg-white px-1 py-0.5 rounded shadow-sm whitespace-nowrap">
          {profile.name}
        </div>
      </div>
    </div>
  );
};

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
    'Toronto': [43.6532, -79.3832]
  };
  return locationMap[location?.city] || [40.7128, -74.0060];
};

// ProfileCard component
const ProfileCard = ({ profile, onShowOnMap, isSelected }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-4 transition-all duration-200 ${
      isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
    }`}>
      <div className="flex items-center space-x-4 mb-3">
        <img
          src={profile.photo || 'https://picsum.photos/100/100'}
          alt={profile.name}
          className="w-15 h-15 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
          <p className="text-sm text-gray-600">{profile.email}</p>
          <p className="text-sm text-gray-500">
            {profile.location?.city}, {profile.location?.country}
          </p>
        </div>
      </div>
      
      {profile.description && (
        <p className="text-sm text-gray-700 mb-3">{profile.description}</p>
      )}
      
      {profile.interests && profile.interests.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {profile.interests.map((interest, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <button
        onClick={() => onShowOnMap(profile)}
        className={`w-full px-4 py-2 rounded-md transition-colors ${
          isSelected 
            ? 'bg-red-500 text-white hover:bg-red-600' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isSelected ? 'Hide from Map' : 'Show on Map'}
      </button>
    </div>
  );
};

export default MapMarker;