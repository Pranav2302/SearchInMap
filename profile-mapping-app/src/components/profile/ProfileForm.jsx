import { useState, useEffect } from 'react';
import { useProfiles } from '../../context/ProfileContext';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ProfileForm({ profile = null, onSubmitSuccess }) {
  const { addProfile, editProfile } = useProfiles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
    description: '',
    location: {
      street: '',
      city: '',
      country: ''
    },
    interests: []
  });
  
  // Interest input state
  const [interestInput, setInterestInput] = useState('');
  
  // Initialize form data if editing a profile
  useEffect(() => {
    if (profile) {
      setFormData({
        ...profile,
        // Ensure location object exists
        location: profile.location || { street: '', city: '', country: '' },
        // Ensure interests array exists
        interests: profile.interests || []
      });
    }
  }, [profile]);
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [locationField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle adding a new interest
  const handleAddInterest = () => {
    if (interestInput.trim() && !formData.interests.includes(interestInput.trim())) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interestInput.trim()]
      });
      setInterestInput('');
    }
  };
  
  // Handle removing an interest
  const handleRemoveInterest = (interest) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(i => i !== interest)
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (profile) {
        await editProfile(profile._id, formData);
      } else {
        await addProfile(formData);
      }
      
      onSubmitSuccess();
    } catch (err) {
      setError('Failed to save profile. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              type="url"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <input
              type="text"
              name="location.street"
              value={formData.location.street}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              name="location.country"
              value={formData.location.country}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Interests
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                placeholder="Add interest"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="mt-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.interests.map((interest, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                  {interest}
                  <button 
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        ></textarea>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onSubmitSuccess}
          className="btn btn-secondary mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : (profile ? 'Save Changes' : 'Create Profile')}
        </button>
      </div>
    </form>
  );
}