import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ profile, onShowOnMap, isSelected }) => {
  const navigate = useNavigate();
  
  const handleShowOnMap = () => {
    if (onShowOnMap) {
      onShowOnMap(profile); // This should work now
    }
  };

  const handleViewProfile = () => {
    // Use profile._id for navigation (MongoDB uses _id)
    navigate(`/profile/${profile._id}`);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden mb-4 ${
      isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
    }`}>
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={profile.photo || 'https://picsum.photos/100/100'}
            alt={profile.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-600">{profile.email}</p>
            {profile.location && (
              <p className="text-sm text-gray-500">
                {profile.location.city}, {profile.location.country}
              </p>
            )}
          </div>
        </div>

        {profile.description && (
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">
            {profile.description}
          </p>
        )}

        {profile.interests && profile.interests.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {profile.interests.slice(0, 3).map((interest, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {interest}
                </span>
              ))}
              {profile.interests.length > 3 && (
                <span className="inline-block text-gray-500 text-xs px-2 py-1">
                  +{profile.interests.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <button
            onClick={handleViewProfile} // Add click handler
            className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm"
          >
            View Profile
          </button>
          <button
            onClick={handleShowOnMap}
            className={`flex-1 px-3 py-2 rounded-md transition-colors text-sm ${
              isSelected
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isSelected ? 'Hide from Map' : 'Show on Map'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;