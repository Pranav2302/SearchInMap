import React from 'react';

const ProfileSummary = ({ profile, onShowMap }) => {
    return (
        <div className="p-4 border rounded shadow-md">
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-gray-600">{profile.description}</p>
            <button 
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
                onClick={onShowMap}
            >
                Show on Map
            </button>
        </div>
    );
};

export default ProfileSummary;