import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { GenreDetail } from './pages/GenreDetail';
import { ArtistDetail } from './pages/ArtistDetail';
import { AlbumDetail } from './pages/AlbumDetail';
import { PDFViewer } from './pages/PDFViewer';

function App() {
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

export default App;