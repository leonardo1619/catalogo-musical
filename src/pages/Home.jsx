import { useNavigate } from 'react-router-dom';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout } from '../components/Layout';
import { Carousel } from '../components/Carousel';
import { GenreCard } from '../components/GenreCard';
import { colors } from '../styles/colors';
import genresData from '../data/genres.json';
import albumsData from '../data/albums.json';
import songsData from '../data/songs.json';
import artistsData from '../data/artists.json';

export function Home() {
  const navigate = useNavigate();

  const handleGenreClick = (genre) => {
    navigate(`/genero/${genre.id}`);
  };

  const handleAlbumClick = (album) => {
    navigate(`/album/${album.id}`);
  };

  // Calcular conteos reales de géneros
  const genresWithRealCounts = genresData.map(genre => {
    const genreSongs = songsData.filter(s => s.genreId === genre.id);
    const genreArtists = artistsData.filter(a => a.genreId === genre.id);
    
    return {
      ...genre,
      songsCount: genreSongs.length,
      artistsCount: genreArtists.length
    };
  });

  // Calcular conteos reales de álbumes
  const albumsWithRealCounts = albumsData.map(album => {
    const albumSongs = songsData.filter(s => s.albumId === album.id);
    
    return {
      ...album,
      songsCount: albumSongs.length
    };
  });

  return (
    <>
      <GlobalStyles />
      <Layout>
        {/* Hero Section con Logo */}
        <div style={{
          height: '60vh',
          background: `linear-gradient(180deg, ${colors.background} 0%, ${colors.backgroundLight} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '2rem',
          padding: '2rem 1rem',
        }}>
          {/* Logo */}
          <img 
            src="/images/LOGOADA.png" 
            alt="Academia de Arte Musical"
            style={{
              width: '180px',
              height: '180px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 12px rgba(103, 169, 67, 0.2))',
            }}
          />
          
          {/* Título */}
          <h1 style={{
            color: colors.primary,
            fontSize: '3rem',
            textAlign: 'center',
            padding: '0 1rem',
            margin: 0,
          }}>
            🎵 Catálogo Musical
          </h1>
          
          {/* Subtítulo */}
          <p style={{
            color: colors.textSecondary,
            fontSize: '1.2rem',
            textAlign: 'center',
            margin: 0,
          }}>
            Academia de Arte Musical
          </p>
        </div>

        {/* Carrusel de Géneros */}
        <div id="generos-section">
          <Carousel title="Géneros Musicales">
            {genresWithRealCounts.map(genre => (
              <GenreCard
                key={genre.id}
                name={genre.name}
                image={genre.image}
                songsCount={genre.songsCount}
                artistsCount={genre.artistsCount}
                onClick={() => handleGenreClick(genre)}
              />
            ))}
          </Carousel>
        </div>

        {/* Carrusel de Álbumes */}
        <div id="albumes-section">
          <Carousel title="Álbumes por Instrumento">
            {albumsWithRealCounts.map(album => (
              <GenreCard
                key={album.id}
                name={album.name}
                image={album.image}
                songsCount={album.songsCount}
                artistsCount={null}
                onClick={() => handleAlbumClick(album)}
              />
            ))}
          </Carousel>
        </div>
      </Layout>
    </>
  );
}