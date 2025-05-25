import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilesPage from './pages/ProfilesPage';
import ProfileDetailPage from './pages/ProfileDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';
import { ProfileProvider } from './context/ProfileContext';

function App() {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/profile/:id" element={<ProfileDetailPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;