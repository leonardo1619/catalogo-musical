import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { GenreDetail } from './pages/GenreDetail';
import { ArtistDetail } from './pages/ArtistDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genero/:genreId" element={<GenreDetail />} />
        <Route path="/genero/:genreId/artista/:artistId" element={<ArtistDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;