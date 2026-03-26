import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginModal } from './components/LoginModal';
import { Home } from './pages/Home';
import { GenreDetail } from './pages/GenreDetail';
import { ArtistDetail } from './pages/ArtistDetail';
import { AlbumDetail } from './pages/AlbumDetail';
import { PDFViewer } from './pages/PDFViewer';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <LoginModal />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genero/:genreId" element={<GenreDetail />} />
        <Route path="/genero/:genreId/artista/:artistId" element={<ArtistDetail />} />
        <Route path="/album/:albumId" element={<AlbumDetail />} />
        <Route path="/pdf/:songId" element={<PDFViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;