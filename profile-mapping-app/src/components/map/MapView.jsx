
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useProfiles } from '../../context/ProfileContext';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom icons for selected/unselected markers
const createCustomIcon = (isSelected = false) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 30px; 
        height: 30px; 
        border-radius: 50%; 
        background: ${isSelected ? '#ef4444' : '#3b82f6'}; 
        border: 2px solid white; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        ${isSelected ? 'animation: pulse 2s infinite;' : ''}
      ">
        📍
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

export default function MapView({ selectedProfile, onProfileSelect }) {
  const { profiles } = useProfiles();
  const mapRef = useRef(null);

  // Default center (World view)
  const defaultCenter = [20, 0];
  const defaultZoom = 2;

  // Function to get coordinates from location
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
    return locationMap[location?.city] || defaultCenter;
  };

  // Effect to center map on selected profile
  useEffect(() => {
    if (selectedProfile && mapRef.current) {
      const coordinates = getCoordinates(selectedProfile.location);
      const map = mapRef.current;
      map.setView(coordinates, 8);
    }
  }, [selectedProfile]);

  // Create markers for all profiles
  const markers = profiles.map((profile, index) => {
    const position = getCoordinates(profile.location);
    const isSelected = selectedProfile && (selectedProfile._id || selectedProfile.id) === (profile._id || profile.id);
    
    return (
      <Marker 
        key={profile._id || profile.id || index} 
        position={position}
        icon={createCustomIcon(isSelected)}
        eventHandlers={{
          click: () => {
            if (onProfileSelect) {
              onProfileSelect(isSelected ? null : profile);
            }
          }
        }}
      >
        <Popup>
          <div className="p-2 min-w-[200px]">
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={profile.photo || 'https://picsum.photos/100/100'}
                alt={profile.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{profile.name}</h3>
                <p className="text-sm text-gray-600">{profile.email}</p>
              </div>
            </div>
           
            <div className="space-y-1 text-sm">
              <p><strong>Location:</strong> {profile.location?.city}, {profile.location?.country}</p>
              {profile.phone && (
                <p><strong>Phone:</strong> {profile.phone}</p>
              )}
              {profile.description && (
                <p><strong>About:</strong> {profile.description}</p>
              )}
              {profile.interests && profile.interests.length > 0 && (
                <div className="mt-2">
                  <p><strong>Interests:</strong></p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.interests.slice(0, 3).map((interest, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Popup>
      </Marker>
    );
  });

  return (
    <div className="h-full w-full">
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Map View</h3>
        {selectedProfile ? (
          <p className="text-sm text-gray-600">
            Showing: <strong>{selectedProfile.name}</strong> in {selectedProfile.location?.city}
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Select a profile to center the map, or click on map markers to view details
          </p>
        )}
      </div>

      <MapContainer
        center={selectedProfile ? getCoordinates(selectedProfile.location) : defaultCenter}
        zoom={selectedProfile ? 8 : defaultZoom}
        style={{ height: '500px', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers}
      </MapContainer>
    </div>
  );
}
