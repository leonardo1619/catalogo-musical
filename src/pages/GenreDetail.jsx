import { useParams } from 'react-router-dom';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout, Container, Section } from '../components/Layout';
import { colors } from '../styles/colors';
import genresData from '../data/genres.json';

export function GenreDetail() {
  const { genreId } = useParams();
  
  // Buscar info del género
  const genre = genresData.find(g => g.id === genreId);

  if (!genre) {
    return <div>Género no encontrado</div>;
  }

  return (
    <>
      <GlobalStyles />
      <Layout>
        {/* Hero del Género con Imagen Panorámica */}
        <div style={{
          height: '50vh',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${genre.heroImage})`,
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
            fontSize: '4rem',
            textAlign: 'center',
            textShadow: '0 4px 12px rgba(0,0,0,0.8)',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontFamily: '"Playfair Display", serif',
            
          }}>
            {genre.name}
          </h1>
          <p style={{ 
            color: '#FFFFFF',
            fontSize: '1.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}>
            {genre.songsCount} Canciones • {genre.artistsCount} Artistas
          </p>
        </div>

        {/* Grid de Artistas (próximo paso) */}
        <Section>
          <Container>
            <h2 style={{ 
              color: colors.text, 
              fontSize: '1.8rem', 
              marginBottom: '2rem' 
            }}>
              Artistas Populares
            </h2>
            
            <p style={{ 
              color: colors.textSecondary,
              fontSize: '1.1rem',
            }}>
              Aquí irá el grid de artistas de {genre.name}...
            </p>
          </Container>
        </Section>
      </Layout>
    </>
  );
}