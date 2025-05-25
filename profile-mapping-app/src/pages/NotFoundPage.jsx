import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="text-center py-16">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-600 mb-8">Page Not Found</h2>
        <p className="text-lg text-gray-500 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary px-6 py-3">
          Back to Home
        </Link>
      </div>
    </Layout>
  );
}