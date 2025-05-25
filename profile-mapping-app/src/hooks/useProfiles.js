import { useEffect, useState } from 'react';
import { fetchProfiles } from '../services/api';

const useProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProfiles = async () => {
            try {
                const data = await fetchProfiles();
                setProfiles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProfiles();
    }, []);

    const filterProfiles = (query) => {
        return profiles.filter(profile => 
            profile.name.toLowerCase().includes(query.toLowerCase())
        );
    };

    return { profiles, loading, error, filterProfiles };
};

export default useProfiles;