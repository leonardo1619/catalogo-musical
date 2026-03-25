import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout } from '../components/Layout';
import { Carousel } from '../components/Carousel';
import { GenreCard } from '../components/GenreCard';
import { colors } from '../styles/colors';

export function Home() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // ✅ OPTIMIZACIÓN: Solo 4 queries en paralelo (antes eran 18+)
        const [genresRes, albumsRes, songsRes, artistsRes] = await Promise.all([
          supabase.from('genres').select('id, slug, name, image, hero_image').order('name'),
          supabase.from('albums').select('id, slug, name, instrument, level, image').order('instrument, level'),
          supabase.from('songs').select('genre_id, album_id'),
          supabase.from('artists').select('genre_id')
        ]);

        if (genresRes.error) throw genresRes.error;
        if (albumsRes.error) throw albumsRes.error;
        if (songsRes.error) throw songsRes.error;
        if (artistsRes.error) throw artistsRes.error;

        // ✅ Calcular conteos en JavaScript (instantáneo)
        const genresWithCounts = (genresRes.data || []).map(genre => {
          const songsCount = (songsRes.data || []).filter(s => s.genre_id === genre.id).length;
          const artistsCount = (artistsRes.data || []).filter(a => a.genre_id === genre.id).length;

          return {
            id: genre.slug,
            name: genre.name,
            image: genre.image,
            heroImage: genre.hero_image,
            songsCount,
            artistsCount
          };
        });

        const albumsWithCounts = (albumsRes.data || []).map(album => {
          const songsCount = (songsRes.data || []).filter(s => s.album_id === album.id).length;

          return {
            id: album.slug,
            name: album.name,
            image: album.image,
            instrument: album.instrument,
            level: album.level,
            songsCount
          };
        });

        setGenres(genresWithCounts);
        setAlbums(albumsWithCounts);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleGenreClick = (genre) => {
    navigate(`/genero/${genre.id}`);
  };

  const handleAlbumClick = (album) => {
    navigate(`/album/${album.id}`);
  };

  if (loading) {
    return (
      <>
        <GlobalStyles />
        <Layout>
          <div style={{
            height: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: colors.textSecondary
          }}>
            Cargando catálogo...
          </div>
        </Layout>
      </>
    );
  }

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
            {genres.map(genre => (
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
            {albums.map(album => (
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