import { useNavigate } from 'react-router-dom';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout, Container, Section, Grid } from '../components/Layout';
import { GenreCard } from '../components/GenreCard';
import { colors } from '../styles/colors';
import genresData from '../data/genres.json';

export function Home() {
  const navigate = useNavigate();

  const handleGenreClick = (genre) => {
    navigate(`/genero/${genre.id}`);
  };

  return (
    <>
      <GlobalStyles />
      <Layout>
        {/* Hero Section */}
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
             Catálogo Musical
          </h1>

          <p style={{
            color: colors.textSecondary,
            fontSize: '1.2rem',
            textAlign: 'center',
          }}>
            Academia de Arte Musical
          </p>
        </div>

        {/* Grid de Géneros */}
        <Section>
          <Container>
            <h2 style={{
              color: colors.text,
              fontSize: '2.8rem',
              marginBottom: '2rem'
            }}>
              Géneros Musicales
            </h2>

            <Grid>
              {genresData.map(genre => (
                <GenreCard
                  key={genre.id}
                  name={genre.name}
                  image={genre.image}
                  songsCount={genre.songsCount}
                  artistsCount={genre.artistsCount}
                  onClick={() => handleGenreClick(genre)}
                />
              ))}
            </Grid>
          </Container>
        </Section>
      </Layout>
    </>
  );
}