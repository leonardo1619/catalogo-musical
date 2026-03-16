import { useParams } from 'react-router-dom';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout, Container, Section } from '../components/Layout';
import { colors } from '../styles/colors';
import albumsData from '../data/albums.json';

export function AlbumDetail() {
  const { albumId } = useParams();
  const album = albumsData.find(a => a.id === albumId);

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
            {album.songsCount} Canciones • Nivel {album.level}
          </p>
          <p style={{ 
            color: '#67A943',
            fontSize: '1.2rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            fontWeight: 'bold',
          }}>
            ⭐ Álbum obligatorio para pasar de nivel
          </p>
        </div>

        {/* Canciones del Álbum (próximo paso) */}
        <Section>
          <Container>
            <h2 style={{ 
              color: colors.text, 
              fontSize: '1.8rem', 
              marginBottom: '2rem' 
            }}>
              Canciones del Álbum
            </h2>
            
            <p style={{ 
              color: colors.textSecondary,
              fontSize: '1.1rem',
              lineHeight: '1.6',
            }}>
              Aquí irá el grid de canciones de <strong>{album.name}</strong>.
              <br />
              Los estudiantes deben completar todas las canciones de este álbum para pasar al siguiente nivel.
            </p>
          </Container>
        </Section>
      </Layout>
    </>
  );
}