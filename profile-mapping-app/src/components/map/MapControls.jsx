import React from 'react';

const MapControls = ({ onZoomIn, onZoomOut, onReset, onShowAll }) => {
  return (
    <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-2 space-y-2">
      <button 
        onClick={onZoomIn} 
        className="block w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Zoom In
      </button>
      <button 
        onClick={onZoomOut} 
        className="block w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Zoom Out
      </button>
      <button 
        onClick={onReset} 
        className="block w-full px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
      >
        Reset
      </button>
      <button 
        onClick={onShowAll} 
        className="block w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Show All
      </button>
    </div>
  );
};

export default MapControls;