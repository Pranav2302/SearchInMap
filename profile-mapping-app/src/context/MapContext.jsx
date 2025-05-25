import React, { createContext, useState, useContext } from 'react';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [mapData, setMapData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMapData = async (location) => {
        setLoading(true);
        try {
            // Call to map service to fetch data based on location
            const data = await fetchMapService(location);
            setMapData(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MapContext.Provider value={{ mapData, loading, error, fetchMapData }}>
            {children}
        </MapContext.Provider>
    );
};

export const useMap = () => {
    return useContext(MapContext);
};