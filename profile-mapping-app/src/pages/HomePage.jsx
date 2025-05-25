import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

export default function HomePage() {
  return (
    <Layout>
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Profile Mapper</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore profiles and their locations interactively on a map. Find people based on location, interests, and more.
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link to="/profiles" className="btn btn-primary text-lg px-6 py-3">
            View Profiles
          </Link>
          <Link to="/admin" className="btn btn-secondary text-lg px-6 py-3">
            Admin Dashboard
          </Link>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl text-blue-500 mb-4">
              <i className="fas fa-user-friends"></i>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Browse Profiles</h2>
            <p className="text-gray-600">
              View a collection of profiles with detailed information about each person.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl text-blue-500 mb-4">
              <i className="fas fa-map-marked-alt"></i>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Interactive Map</h2>
            <p className="text-gray-600">
              See where profiles are located on an interactive, dynamic map.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl text-blue-500 mb-4">
              <i className="fas fa-search"></i>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Search & Filter</h2>
            <p className="text-gray-600">
              Find profiles based on location, name, and other criteria.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}