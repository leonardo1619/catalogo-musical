import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { GenreDetail } from './pages/GenreDetail';
import { ArtistDetail } from './pages/ArtistDetail';
import { AlbumDetail } from './pages/AlbumDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal con carruseles */}
        <Route path="/" element={<Home />} />
        
        {/* Detalle de género (muestra artistas) */}
        <Route path="/genero/:genreId" element={<GenreDetail />} />
        
        {/* Detalle de artista (muestra canciones) */}
        <Route path="/genero/:genreId/artista/:artistId" element={<ArtistDetail />} />
        
        {/* Detalle de álbum (muestra canciones del álbum) */}
        <Route path="/album/:albumId" element={<AlbumDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;