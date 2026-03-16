import { useNavigate } from 'react-router-dom';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout } from '../components/Layout';
import { Carousel } from '../components/Carousel';
import { GenreCard } from '../components/GenreCard';
import { colors } from '../styles/colors';
import genresData from '../data/genres.json';
import albumsData from '../data/albums.json';

export function Home() {
  const navigate = useNavigate();

  const handleGenreClick = (genre) => {
    navigate(`/genero/${genre.id}`);
  };

  const handleAlbumClick = (album) => {
    navigate(`/album/${album.id}`);
  };

  return (
    <>
      <GlobalStyles />
      <Layout>
        {/* Hero Section */}
        <div style={{
          height: '60vh',
          background: `linear-gradient(180deg, ${colors.background} 0%, ${colors.backgroundLight} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <h1 style={{
            color: colors.primary,
            fontSize: '3rem',
            textAlign: 'center',
            padding: '0 1rem',
          }}>
            🎵 Catálogo Musical
          </h1>
          <p style={{
            color: colors.textSecondary,
            fontSize: '1.2rem',
            textAlign: 'center',
          }}>
            Academia de Arte Musical
          </p>
        </div>

        {/* Carrusel de Géneros */}
        <Carousel title="Géneros Musicales">
          {genresData.map(genre => (
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

        {/* Carrusel de Álbumes */}
        <Carousel title="Álbumes por Instrumento">
          {albumsData.map(album => (
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
      </Layout>
    </>
  );
}