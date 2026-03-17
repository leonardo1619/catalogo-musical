import { useParams } from 'react-router-dom';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout, Container, Section } from '../components/Layout';
import { SongRow } from '../components/SongRow';
import { colors } from '../styles/colors';
import albumsData from '../data/albums.json';
import songsData from '../data/songs.json';

export function AlbumDetail() {
  const { albumId } = useParams();
  const album = albumsData.find(a => a.id === albumId);
  
  // Filtrar canciones de este álbum y ordenar alfabéticamente
  const albumSongs = songsData
    .filter(s => s.albumId === albumId)
    .sort((a, b) => a.title.localeCompare(b.title, 'es'));

  const handleDownload = (song) => {
    console.log('Descargar PDF:', song.pdf);
    window.open(song.pdf, '_blank');
  };

  if (!album) {
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
        {/* Hero del Álbum */}
        <div style={{
          height: '50vh',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${album.heroImage || album.image})`,
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
            {albumSongs.length} Canciones • Nivel {album.level}
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

        {/* Lista de Canciones */}
        <Section>
          <Container>
            <h2 style={{ 
              color: colors.text, 
              fontSize: '2.8rem', 
              marginBottom: '2rem' 
            }}>
              Canciones del Álbum
            </h2>
            
            {albumSongs.length === 0 ? (
              <p style={{ color: colors.textSecondary }}>
                No hay canciones disponibles en este álbum
              </p>
            ) : (
              <div>
                {/* Header de la tabla */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 150px 80px',
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
                  <div style={{ textAlign: 'center' }}>Dificultad</div>
                  <div style={{ textAlign: 'center' }}>Descargar</div>
                </div>

                {/* Filas de canciones */}
                {albumSongs.map((song, index) => (
                  <SongRow
                    key={song.id}
                    number={index + 1}
                    title={song.title}
                    difficulty={song.difficulty}
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