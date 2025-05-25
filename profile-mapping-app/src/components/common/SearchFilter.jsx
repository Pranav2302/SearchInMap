import { useState } from 'react';
import { useProfiles } from '../../context/ProfileContext';

export default function SearchFilter() {
  const { searchTerm, setSearchTerm, filters, setFilters } = useProfiles();
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Available filter options
  const cities = ['New York', 'Los Angeles', 'Chicago', 'London', 'Paris', 'Pune','Kolhapur','Chennai','Dubai','Berlin','Manali','Cairo','Wellington'];
  const countries = ['USA', 'UK', 'France', 'Germany', 'Japan', 'India','UAE','Egypt','New Zealand'];
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(localSearch);
  };
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      // If the value is the same as the current one, remove the filter
      if (prev[key] === value) {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      }
      // Otherwise, set the new filter value
      return { ...prev, [key]: value };
    });
  };
  
  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setLocalSearch('');
  };
  
  return (
    <div className="mb-8">
      <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={localSearch}
          onChange={e => setLocalSearch(e.target.value)}
          placeholder="Search profiles..."
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="btn btn-primary"
        >
          Search
        </button>
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          Filters
        </button>
      </form>
      
      {isFilterOpen && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">City</h3>
              <div className="space-y-2">
                {cities.map(city => (
                  <label key={city} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.city === city}
                      onChange={() => handleFilterChange('city', city)}
                      className="mr-2"
                    />
                    {city}
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Country</h3>
              <div className="space-y-2">
                {countries.map(country => (
                  <label key={country} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.country === country}
                      onChange={() => handleFilterChange('country', country)}
                      className="mr-2"
                    />
                    {country}
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
      
      {(Object.keys(filters).length > 0 || searchTerm) && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Search: {searchTerm}
            </span>
          )}
          
          {Object.entries(filters).map(([key, value]) => (
            <span 
              key={key} 
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {key}: {value}
              <button 
                onClick={() => handleFilterChange(key, value)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}