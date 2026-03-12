import { GlobalStyles } from './styles/GlobalStyles';
import { Layout, Container, Section, Grid } from './components/Layout';
import { SongCard } from './components/SongCard';
import { colors } from './styles/colors';
import songsData from './data/songs.json';

function App() {

  const handleSongClick = (song) => {
    console.log("Clicked:", song);
  };

  return (
    <>
      <GlobalStyles />
      <Layout>

        {/* HERO */}
        <div style={{
          height: '60vh',
          background: `linear-gradient(180deg, ${colors.background} 0%, ${colors.backgroundLight} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <h1 style={{
            color: colors.primary,
            fontSize: '3rem',
            textAlign: 'center',
            padding: '0 1rem',
          }}>
            🎵 Catálogo Musical
          </h1>

          <p style={{
            color: colors.textSecondary,
            fontSize: '1.2rem',
            textAlign: 'center',
          }}>
            Academia de Arte Musical
          </p>
        </div>

        {/* GRID DE CANCIONES */}
        <Section>
          <Container>

            <h2 style={{
              color: colors.text,
              fontSize: '1.8rem',
              marginBottom: '2rem'
            }}>
              Canciones Populares
            </h2>

            <Grid>
              {songsData.map(song => (
                <SongCard
                  key={song.id}
                  title={song.title}
                  artist={song.artist}
                  genre={song.genre}
                  image={song.image}
                  onClick={() => handleSongClick(song)}
                />
              ))}
            </Grid>

          </Container>
        </Section>

      </Layout>
    </>
  );
}

export default App;