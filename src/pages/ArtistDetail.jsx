import { useParams, useNavigate } from 'react-router-dom';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout, Container, Section } from '../components/Layout';
import { SongRow } from '../components/SongRow';
import { colors } from '../styles/colors';
import artistsData from '../data/artists.json';
import genresData from '../data/genres.json';
import songsData from '../data/songs.json';

export function ArtistDetail() {
  const { genreId, artistId } = useParams();
  const navigate = useNavigate();
  
  const artist = artistsData.find(a => a.id === artistId);
  const genre = genresData.find(g => g.id === genreId);
  
  // Filtrar canciones de este artista y ordenar alfabéticamente
  const artistSongs = songsData
    .filter(s => s.artistId === artistId)
    .sort((a, b) => a.title.localeCompare(b.title, 'es'));

  // Navegar a página de PDF
  const handleRowClick = (song) => {
    navigate(`/pdf/${song.id}`);
  };

  // Descarga rápida
  const handleDownload = (song) => {
    const link = document.createElement('a');
    link.href = song.pdf;
    link.download = `${song.title}.pdf`;
    link.click();
  };

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
            {artistSongs.length} Canciones • {genre?.name}
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
            
            {artistSongs.length === 0 ? (
              <p style={{ color: colors.textSecondary }}>
                No hay canciones disponibles para {artist.name}
              </p>
            ) : (
              <div>
{/* Header de la tabla */}
<div style={{
  display: 'grid',
  gridTemplateColumns: '60px 1fr 150px 150px 80px',  // ← CAMBIÓ
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
{artistSongs.map((song, index) => {
  const genre = genresData.find(g => g.id === song.genreId);
  return (
    <SongRow
      key={song.id}
      number={index + 1}
      title={song.title}
      genre={genre?.name || 'Sin género'}
      difficulty={song.difficulty}
      onRowClick={() => handleRowClick(song)}
      onDownload={() => handleDownload(song)}
    />
  );
})}
              </div>
            )}
          </Container>
        </Section>
      </Layout>
    </>
  );
}