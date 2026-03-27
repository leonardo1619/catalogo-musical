import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Layout, Container } from '../components/Layout';
import { colors } from '../styles/colors';
import { FiArrowLeft, FiDownload, FiPrinter } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { PaywallModal } from '../components/PaywallModal';

export function PDFViewer() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();

  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paywallConfig, setPaywallConfig] = useState(null);

  useEffect(() => {
    async function fetchSong() {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('slug', songId)
        .single();

      if (!error && data) {
        setSong({ title: data.title, pdf: data.pdf_url });
      }
      setLoading(false);
    }
    fetchSong();
  }, [songId]);

  const handleDownload = () => {
    if (role === 'admin') {
      const link = document.createElement('a');
      link.href = song.pdf;
      link.download = `${song.title}.pdf`;
      link.click();
    } else {
      setPaywallConfig({ action: 'descargar', context: song.title, songCount: 1 });
    }
  };

  const handlePrint = () => {
    if (role === 'admin') {
      const printWindow = window.open(song.pdf);
      printWindow.onload = () => printWindow.print();
    } else {
      setPaywallConfig({ action: 'imprimir', context: song.title, songCount: 1 });
    }
  };

  if (loading) {
    return (
      <>
        <GlobalStyles />
        <Layout>
          <Container>
            <div style={{
              height: '80vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: colors.textSecondary
            }}>
              Cargando canción...
            </div>
          </Container>
        </Layout>
      </>
    );
  }

  if (!song) {
    return (
      <>
        <GlobalStyles />
        <Layout>
          <Container>
            <div style={{ padding: '4rem 0', textAlign: 'center', color: colors.text }}>
              <h1>Canción no encontrada</h1>
              <button onClick={() => navigate(-1)}>← Volver</button>
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
          top: '90px',
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.backgroundLight}`,
          padding: '1rem 4%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 100,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
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
            }}
          >
            <FiArrowLeft size={20} />
            Volver
          </button>

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
          minHeight: 'calc(100vh - 90px - 80px)',
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

      {/* Paywall Modal */}
      {paywallConfig && (
        <PaywallModal
          type="single"
          songCount={paywallConfig.songCount}
          context={paywallConfig.context}
          action={paywallConfig.action}
          onClose={() => setPaywallConfig(null)}
        />
      )}
    </>
  );
}