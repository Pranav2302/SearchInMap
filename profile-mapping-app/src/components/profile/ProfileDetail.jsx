import React from 'react';

const ProfileDetail = ({ profile }) => {
    if (!profile) {
        return <div className="text-center">Profile not found.</div>;
    }

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <img src={profile.photo} alt={profile.name} className="w-full h-48 object-cover rounded-md" />
            <p className="text-gray-700">{profile.description}</p>
            <div className="flex flex-col">
                <h3 className="font-semibold">Details:</h3>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Location:</strong> {profile.location}</p>
                <p><strong>Joined:</strong> {new Date(profile.joined).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default ProfileDetail;