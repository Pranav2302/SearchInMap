// ProfileList.jsx - Fixed with map integration
import { useProfiles } from '../../context/ProfileContext';
import ProfileCard from './ProfileCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

export default function ProfileList({ onShowOnMap, selectedProfileId }) {
  const { profiles, loading, error } = useProfiles();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-gray-500">No profiles found</h3>
        <p className="mt-2 text-gray-400">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map(profile => (
        <ProfileCard 
          key={profile._id} 
          profile={profile} 
          onShowOnMap={onShowOnMap} // Pass the function correctly
          isSelected={selectedProfileId === profile._id} // Fix prop name and comparison
        />
      ))}
    </div>
  );
}