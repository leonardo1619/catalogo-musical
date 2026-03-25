import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout, Container, Section } from '../components/Layout';
import { SongRow } from '../components/SongRow';
import { colors } from '../styles/colors';

export function ArtistDetail() {
  const { genreId, artistId } = useParams();
  const navigate = useNavigate();
  
  const [artist, setArtist] = useState(null);
  const [genre, setGenre] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtistData() {
      try {
        // Cargar artista
        const { data: artistData, error: artistError } = await supabase
          .from('artists')
          .select('*')
          .eq('slug', artistId)
          .single();

        if (artistError) throw artistError;

        if (!artistData) {
          setLoading(false);
          return;
        }

        // Cargar género del artista
        const { data: genreData, error: genreError } = await supabase
          .from('genres')
          .select('*')
          .eq('id', artistData.genre_id)
          .single();

        if (genreError) throw genreError;

        // Cargar canciones del artista con información de género
        const { data: songsData, error: songsError } = await supabase
          .from('songs')
          .select(`
            *,
            genre:genres(name)
          `)
          .eq('artist_id', artistData.id)
          .order('title');

        if (songsError) throw songsError;

        setArtist({
          id: artistData.slug,
          name: artistData.name,
          image: artistData.image,
          heroImage: artistData.hero_image
        });

        setGenre({
          id: genreData.slug,
          name: genreData.name
        });

        setSongs((songsData || []).map(song => ({
          id: song.slug,
          title: song.title,
          difficulty: song.difficulty,
          pdf: song.pdf_url,
          genreName: song.genre?.name || 'Sin género'
        })));

      } catch (error) {
        console.error('Error cargando artista:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtistData();
  }, [artistId]);

  const handleRowClick = (song) => {
    navigate(`/pdf/${song.id}`);
  };

  const handleDownload = (song) => {
    if (!song.pdf) {
      alert('PDF no disponible');
      return;
    }
    const link = document.createElement('a');
    link.href = song.pdf;
    link.download = `${song.title}.pdf`;
    link.click();
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
              Cargando artista...
            </div>
          </Container>
        </Layout>
      </>
    );
  }

  if (!artist) {
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
              <h1>Artista no encontrado</h1>
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
        {/* Hero del Artista */}
        <div style={{
          height: '50vh',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${artist.heroImage || artist.image})`,
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
            fontFamily: '"Bebas Neue", cursive',
            letterSpacing: '4px',
          }}>
            {artist.name}
          </h1>
          <p style={{ 
            color: '#FFFFFF',
            fontSize: '1.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            fontFamily: '"Helvetica Neue", sans-serif',
            fontWeight: '300',
          }}>
            {songs.length} Canciones • {genre?.name}
          </p>
        </div>

        {/* Lista de Canciones */}
        <Section>
          <Container>
            <h2 style={{ 
              color: colors.text, 
              fontSize: '1.8rem', 
              marginBottom: '2rem' 
            }}>
              Canciones
            </h2>
            
            {songs.length === 0 ? (
              <p style={{ color: colors.textSecondary }}>
                No hay canciones disponibles para {artist.name}
              </p>
            ) : (
              <div>
                {/* Header de la tabla */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 150px 150px 80px',
                  gap: '1rem',
                  padding: '0.75rem 1.5rem',
                  borderBottom: `2px solid ${colors.backgroundLight}`,
                  color: colors.textSecondary,
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  <div style={{ textAlign: 'center' }}>#</div>
                  <div>Canción</div>
                  <div style={{ textAlign: 'center' }}>Género</div>
                  <div style={{ textAlign: 'center' }}>Dificultad</div>
                  <div style={{ textAlign: 'center' }}>Descargar</div>
                </div>

                {/* Filas de canciones */}
                {songs.map((song, index) => (
                  <SongRow
                    key={song.id}
                    number={index + 1}
                    title={song.title}
                    genre={song.genreName}
                    difficulty={song.difficulty}
                    onRowClick={() => handleRowClick(song)}
                    onDownload={() => handleDownload(song)}
                  />
                ))}
              </div>
            )}
          </Container>
        </Section>
      </Layout>
    </>
  );
}