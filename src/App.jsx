import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { GenreDetail } from './pages/GenreDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genero/:genreId" element={<GenreDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
