import { useParams } from 'react-router-dom';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout, Container, Section } from '../components/Layout';
import { colors } from '../styles/colors';
import artistsData from '../data/artists.json';
import genresData from '../data/genres.json';

export function ArtistDetail() {
  const { genreId, artistId } = useParams();
  
  const artist = artistsData.find(a => a.id === artistId);
  const genre = genresData.find(g => g.id === genreId);

  if (!artist) {
    return <div>Artista no encontrado</div>;
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
          }}>
            {artist.songsCount} Canciones • {genre?.name}
          </p>
        </div>

        {/* Grid de Canciones (próximo paso) */}
        <Section>
          <Container>
            <h2 style={{ 
              color: colors.text, 
              fontSize: '3.0rem', 
              marginBottom: '2rem' 
            }}>
              Canciones
            </h2>
            
            <p style={{ color: colors.textSecondary }}>
              Aquí irá el grid de canciones de {artist.name}...
            </p>
          </Container>
        </Section>
      </Layout>
    </>
  );
}