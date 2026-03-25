import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout, Container, Section, Grid } from '../components/Layout';
import { ArtistCard } from '../components/ArtistCard';
import { colors } from '../styles/colors';

export function GenreDetail() {
  const navigate = useNavigate();
  const { genreId } = useParams();
  
  const [genre, setGenre] = useState(null);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSongs, setTotalSongs] = useState(0);
  const [totalArtists, setTotalArtists] = useState(0);

  useEffect(() => {
    async function fetchGenreData() {
      try {
        // Cargar género
        const { data: genreData, error: genreError } = await supabase
          .from('genres')
          .select('*')
          .eq('slug', genreId)
          .single();

        if (genreError) throw genreError;

        if (!genreData) {
          setLoading(false);
          return;
        }

        // Cargar artistas del género
        const { data: artistsData, error: artistsError } = await supabase
          .from('artists')
          .select('*')
          .eq('genre_id', genreData.id)
          .order('name');

        if (artistsError) throw artistsError;

        // Contar canciones totales del género
        const { count: songsCount } = await supabase
          .from('songs')
          .select('*', { count: 'exact', head: true })
          .eq('genre_id', genreData.id);

        // Calcular conteos por artista
        const artistsWithCounts = await Promise.all(
          (artistsData || []).map(async (artist) => {
            const { count: artistSongsCount } = await supabase
              .from('songs')
              .select('*', { count: 'exact', head: true })
              .eq('artist_id', artist.id)
              .eq('genre_id', genreData.id);

            return {
              id: artist.slug,
              name: artist.name,
              image: artist.image,
              heroImage: artist.hero_image,
              songsCount: artistSongsCount || 0
            };
          })
        );

        setGenre({
          id: genreData.slug,
          name: genreData.name,
          image: genreData.image,
          heroImage: genreData.hero_image
        });
        setArtists(artistsWithCounts);
        setTotalSongs(songsCount || 0);
        setTotalArtists(artistsData?.length || 0);
      } catch (error) {
        console.error('Error cargando género:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGenreData();
  }, [genreId]);

  const handleArtistClick = (artist) => {
    navigate(`/genero/${genreId}/artista/${artist.id}`);
  };

  if (loading) {
    return (
      <>
        <GlobalStyles />
        <Layout>
          <Container>
            <div style={{
              height: '80vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: colors.textSecondary
            }}>
              Cargando género...
            </div>
          </Container>
        </Layout>
      </>
    );
  }

  if (!genre) {
    return (
      <>
        <GlobalStyles />
        <Layout>
          <Container>
            <div style={{ 
              padding: '4rem 0', 
              textAlign: 'center',
              color: colors.text 
            }}>
              <h1>Género no encontrado</h1>
            </div>
          </Container>
        </Layout>
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <Layout>
        {/* Hero del Género */}
        <div style={{
          height: '50vh',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${genre.heroImage || genre.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <h1 style={{ 
            color: '#FFFFFF',
            fontSize: '5rem',
            textAlign: 'center',
            textShadow: '0 4px 16px rgba(0,0,0,0.9)',
            fontWeight: 'normal',
            textTransform: 'uppercase',
            fontFamily: '"Bebas Neue", cursive',
            letterSpacing: '4px',
          }}>
            {genre.name}
          </h1>
          <p style={{ 
            color: '#FFFFFF',
            fontSize: '1.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            fontFamily: '"Helvetica Neue", sans-serif',
            fontWeight: '300',
          }}>
            {totalSongs} Canciones • {totalArtists} Artistas
          </p>
        </div>

        {/* Grid de Artistas */}
        <Section>
          <Container>
            <h2 style={{ 
              color: colors.text, 
              fontSize: '2.8rem', 
              marginBottom: '2rem' 
            }}>
              Artistas 
            </h2>
            
            {artists.length === 0 ? (
              <p style={{ color: colors.textSecondary }}>
                No hay artistas disponibles en este género
              </p>
            ) : (
              <Grid>
                {artists.map(artist => (
                  <ArtistCard
                    key={artist.id}
                    name={artist.name}
                    image={artist.image}
                    songsCount={artist.songsCount}
                    onClick={() => handleArtistClick(artist)}
                  />
                ))}
              </Grid>
            )}
          </Container>
        </Section>
      </Layout>
    </>
  );
}