import { useNavigate, useParams } from 'react-router-dom';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout, Container, Section, Grid } from '../components/Layout';
import { ArtistCard } from '../components/ArtistCard';
import { colors } from '../styles/colors';
import genresData from '../data/genres.json';
import artistsData from '../data/artists.json';
import songsData from '../data/songs.json';

export function GenreDetail() {
  const navigate = useNavigate();
  const { genreId } = useParams();
  
  const genre = genresData.find(g => g.id === genreId);
  
  // Filtrar artistas de este género
  const genreArtists = artistsData.filter(a => a.genreId === genreId);

  // ✅ CALCULAR CONTEOS REALES
  // Conteo total de canciones del género
  const totalSongs = songsData.filter(s => s.genreId === genreId).length;
  
  // Conteo de artistas del género
  const totalArtists = genreArtists.length;

  // Artistas con conteo real de canciones
const artistsWithRealCounts = genreArtists.map(artist => {
  const artistSongs = songsData.filter(s => 
    s.artistId === artist.id && s.genreId === genreId  // ← FILTRAR POR GÉNERO TAMBIÉN
  );
  
  return {
    ...artist,
    songsCount: artistSongs.length
  };
});

  const handleArtistClick = (artist) => {
    navigate(`/genero/${genreId}/artista/${artist.id}`);
  };

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
        {/* Hero del Género con Conteo Real */}
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

        {/* Grid de Artistas con Conteo Real */}
        <Section>
          <Container>
            <h2 style={{ 
              color: colors.text, 
              fontSize: '2.8rem', 
              marginBottom: '2rem' 
            }}>
              Artistas 
            </h2>
            
            {artistsWithRealCounts.length === 0 ? (
              <p style={{ color: colors.textSecondary }}>
                No hay artistas disponibles en este género
              </p>
            ) : (
              <Grid>
                {artistsWithRealCounts.map(artist => (
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