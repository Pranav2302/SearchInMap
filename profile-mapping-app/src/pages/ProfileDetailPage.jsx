import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import MapView from '../components/map/MapView';
import { getProfileById } from '../services/api';
import { ProfileProvider } from '../context/ProfileContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function ProfileDetailPage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfileById(id);
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [id]);
  
  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }
  
  if (error || !profile) {
    return (
      <Layout>
        <ErrorMessage message={error || 'Profile not found'} />
        <div className="mt-4">
          <Link to="/profiles" className="btn btn-primary">
            Back to Profiles
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <ProfileProvider>
      <Layout>
        <div className="mb-4">
          <Link to="/profiles" className="text-blue-600 hover:underline">
            ← Back to Profiles
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={profile.photo || 'https://picsum.photos/100/100'} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{profile.name}</h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {profile.location.street}, {profile.location.city}, {profile.location.country}
              </div>
              
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700">{profile.description}</p>
              </div>
              
              <div className="border-t pt-4">
                <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                <p className="flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {profile.email}
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {profile.phone}
                </p>
              </div>
              
              {profile.interests && profile.interests.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  <h2 className="text-xl font-semibold mb-2">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Location</h2>
          <div className="h-[400px]">
            <MapView selectedProfileId={profile._id} /> {/* Change: profile.id → profile._id */}
          </div>
        </div>
      </Layout>
    </ProfileProvider>
  );
}