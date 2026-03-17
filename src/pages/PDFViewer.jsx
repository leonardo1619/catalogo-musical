import { useParams, useNavigate } from 'react-router-dom';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout, Container } from '../components/Layout';
import { colors } from '../styles/colors';
import songsData from '../data/songs.json';
import { FiArrowLeft, FiDownload, FiPrinter } from 'react-icons/fi';

export function PDFViewer() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const song = songsData.find(s => s.id === songId);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = song.pdf;
    link.download = `${song.title}.pdf`;
    link.click();
  };

  const handlePrint = () => {
    const printWindow = window.open(song.pdf);
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  if (!song) {
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
              <h1>Canción no encontrada</h1>
              <button onClick={() => navigate(-1)}>
                ← Volver
              </button>
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
        {/* Header con controles */}
        <div style={{
          position: 'sticky',
          top: '90px', // Debajo del header principal
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.backgroundLight}`,
          padding: '1rem 4%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 100,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          {/* Botón Volver */}
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              border: `2px solid ${colors.primary}`,
              borderRadius: '8px',
              color: colors.primary,
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = colors.primary;
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = colors.primary;
            }}
          >
            <FiArrowLeft size={20} />
            Volver
          </button>

          {/* Título */}
          <h1 style={{
            color: colors.text,
            fontSize: '1.5rem',
            fontWeight: '700',
            margin: 0,
            flex: 1,
            textAlign: 'center',
          }}>
            {song.title}
          </h1>

          {/* Botones de acción */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleDownload}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: colors.primary,
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = colors.primaryDark;
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = colors.primary;
                e.target.style.transform = 'scale(1)';
              }}
            >
              <FiDownload size={20} />
              Descargar
            </button>

            <button
              onClick={handlePrint}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: colors.backgroundCard,
                border: `2px solid ${colors.primary}`,
                borderRadius: '8px',
                color: colors.primary,
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = colors.hover;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = colors.backgroundCard;
              }}
            >
              <FiPrinter size={20} />
              Imprimir
            </button>
          </div>
        </div>

        {/* Visor de PDF */}
        <div style={{
          padding: '2rem 4%',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: colors.backgroundLight,
          minHeight: 'calc(100vh - 90px - 80px)', // Pantalla completa menos headers
        }}>
          <iframe
            src={song.pdf}
            style={{
              width: '100%',
              maxWidth: '1200px',
              height: '80vh',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
            title={song.title}
          />
        </div>
      </Layout>
    </>
  );
}