import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout, Container, Section } from '../components/Layout';
import { SongRow } from '../components/SongRow';
import { colors } from '../styles/colors';
import { useAuth } from '../contexts/AuthContext';
import { PaywallModal } from '../components/PaywallModal';

export function AlbumDetail() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();

  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paywallConfig, setPaywallConfig] = useState(null);

  useEffect(() => {
    async function fetchAlbumData() {
      try {
        const { data: albumData, error: albumError } = await supabase
          .from('albums')
          .select('*')
          .eq('slug', albumId)
          .single();

        if (albumError) throw albumError;
        if (!albumData) { setLoading(false); return; }

        const { data: songsData, error: songsError } = await supabase
          .from('songs')
          .select(`*, genre:genres(name)`)
          .eq('album_id', albumData.id)
          .order('title');

        if (songsError) throw songsError;

        setAlbum({
          id: albumData.slug,
          name: albumData.name,
          image: albumData.image,
          instrument: albumData.instrument,
          level: albumData.level
        });

        setSongs((songsData || []).map(song => ({
          id: song.slug,
          title: song.title,
          difficulty: song.difficulty,
          pdf: song.pdf_url,
          genreName: song.genre?.name || 'Sin género'
        })));

      } catch (error) {
        console.error('Error cargando álbum:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAlbumData();
  }, [albumId]);

  const handleRowClick = (song) => {
    navigate(`/pdf/${song.id}`);
  };

  const handleDownload = (song) => {
    if (role === 'admin') {
      if (!song.pdf) { alert('PDF no disponible'); return; }
      const link = document.createElement('a');
      link.href = song.pdf;
      link.download = `${song.title}.pdf`;
      link.click();
    } else {
      setPaywallConfig({ action: 'descargar', context: song.title, songCount: 1 });
    }
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
              Cargando álbum...
            </div>
          </Container>
        </Layout>
      </>
    );
  }

  if (!album) {
    return (
      <>
        <GlobalStyles />
        <Layout>
          <Container>
            <div style={{ padding: '4rem 0', textAlign: 'center', color: colors.text }}>
              <h1>Álbum no encontrado</h1>
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
        <div style={{
          height: '50vh',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${album.image})`,
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
            {album.name}
          </h1>
          <p style={{
            color: '#FFFFFF',
            fontSize: '1.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            fontFamily: '"Helvetica Neue", sans-serif',
            fontWeight: '300',
          }}>
            {songs.length} Canciones • Nivel {album.level}
          </p>
          <p style={{
            color: '#FFD700',
            fontSize: '1.2rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            fontWeight: 'bold',
          }}>
            ⭐ Álbum obligatorio para pasar de nivel
          </p>
        </div>

        <Section>
          <Container>
            <h2 style={{ color: colors.text, fontSize: '2.8rem', marginBottom: '2rem' }}>
              Canciones del Álbum
            </h2>

            {songs.length === 0 ? (
              <p style={{ color: colors.textSecondary }}>
                No hay canciones disponibles en este álbum
              </p>
            ) : (
              <div>
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

      {paywallConfig && (
        <PaywallModal
          type="single"
          songCount={paywallConfig.songCount}
          context={paywallConfig.context}
          action={paywallConfig.action}
          onClose={() => setPaywallConfig(null)}
        />
      )}
    </>
  );
}