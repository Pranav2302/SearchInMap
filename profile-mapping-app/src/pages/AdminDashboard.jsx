import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useProfiles } from '../context/ProfileContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ProfileForm from '../components/profile/ProfileForm';

export default function AdminDashboard() {
  const { profiles, loading, error, removeProfile } = useProfiles();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  
  const handleAddNew = () => {
    setEditingProfile(null);
    setShowAddForm(true);
  };
  
  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setShowAddForm(true);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        await removeProfile(id);
      } catch (err) {
        console.error('Failed to delete profile:', err);
      }
    }
  };
  
  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingProfile(null);
  };
  
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      {error && <ErrorMessage message={error} />}
      
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Profiles</h2>
        <button 
          onClick={handleAddNew}
          className="btn btn-primary"
        >
          Add New Profile
        </button>
      </div>
      
      {showAddForm && (
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              {editingProfile ? 'Edit Profile' : 'Add New Profile'}
            </h3>
            <button 
              onClick={handleFormClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <ProfileForm 
            profile={editingProfile} 
            onSubmitSuccess={handleFormClose}
          />
        </div>
      )}
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {profiles.map(profile => (
                <tr key={profile._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full object-cover" 
                          src={profile.photo || 'https://picsum.photos/100/100'} 
                          alt={profile.name} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {profile.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {profile.location.city}, {profile.location.country}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {profile.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(profile)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(profile._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}