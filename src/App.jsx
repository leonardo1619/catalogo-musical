import { GlobalStyles } from './styles/GlobalStyles';
import { Layout, Container, Section, Grid } from './components/Layout';
import { colors } from './styles/colors';

function App() {
  // Data temporal de ejemplo (después será de Supabase)
  const exampleSongs = [
    { id: 1, title: 'Cielito Lindo', genre: 'Mariachi' },
    { id: 2, title: 'Bésame Mucho', genre: 'Bolero' },
    { id: 3, title: 'La Bamba', genre: 'Son Jarocho' },
    { id: 4, title: 'Summertime', genre: 'Jazz' },
    { id: 5, title: 'Fly Me to the Moon', genre: 'Jazz' },
    { id: 6, title: 'My Way', genre: 'Soundtrack' },
  ];

  return (
    <>
      <GlobalStyles />
      <Layout>
        {/* Hero Section - Próximo paso */}
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

        {/* Grid de Canciones - Vista previa */}
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
              {exampleSongs.map(song => (
                <div
                  key={song.id}
                  style={{
                    aspectRatio: '2/3',
                    backgroundColor: colors.backgroundCard,
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = `0 8px 16px ${colors.shadowGreen}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    fontSize: '3rem', 
                    marginBottom: '1rem' 
                  }}>
                    🎼
                  </div>
                  <h3 style={{ 
                    color: colors.text, 
                    fontSize: '1rem',
                    textAlign: 'center',
                    marginBottom: '0.5rem',
                  }}>
                    {song.title}
                  </h3>
                  <p style={{ 
                    color: colors.textTertiary, 
                    fontSize: '0.85rem' 
                  }}>
                    {song.genre}
                  </p>
                </div>
              ))}
            </Grid>
          </Container>
        </Section>
      </Layout>
    </>
  );
}

export default App;
