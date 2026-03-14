import { useNavigate, useParams } from 'react-router-dom';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout, Container, Section, Grid } from '../components/Layout';
import { ArtistCard } from '../components/ArtistCard';
import { colors } from '../styles/colors';
import genresData from '../data/genres.json';
import artistsData from '../data/artists.json';

export function GenreDetail() {
  const navigate = useNavigate();
  const { genreId } = useParams();
  
  const genre = genresData.find(g => g.id === genreId);
  
  // Filtrar artistas de este género
  const genreArtists = artistsData.filter(a => a.genreId === genreId);

  const handleArtistClick = (artist) => {
    navigate(`/genero/${genreId}/artista/${artist.id}`);
  };

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
            fontFamily: '"Playfair Display", serif', 
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
            {genre.songsCount} Canciones • {genre.artistsCount} Artistas
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
            
            <Grid>
              {genreArtists.map(artist => (
                <ArtistCard
                  key={artist.id}
                  name={artist.name}
                  image={artist.image}
                  songsCount={artist.songsCount}
                  onClick={() => handleArtistClick(artist)}
                />
              ))}
            </Grid>
          </Container>
        </Section>
      </Layout>
    </>
  );
}