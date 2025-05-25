import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-xl font-bold">Profile Mapper</Link>
            
            <div className="space-x-4">
              <Link 
                to="/"
                className={`hover:text-blue-300 ${location.pathname === '/' ? 'text-blue-300' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/profiles"
                className={`hover:text-blue-300 ${location.pathname === '/profiles' ? 'text-blue-300' : ''}`}
              >
                Profiles
              </Link>
              <Link 
                to="/admin"
                className={`hover:text-blue-300 ${location.pathname.startsWith('/admin') ? 'text-blue-300' : ''}`}
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Profile Mapper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}