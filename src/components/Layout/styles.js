import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { layout, mediaQuery } from '../../styles/layout';

// Wrapper principal de toda la app
export const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
`;

// Main content (debajo del header fijo)
export const Main = styled.main`
  padding-top: ${layout.headerHeight};
  width: 100%;
  min-height: calc(100vh - ${layout.headerHeight});
`;

// Contenedor centrado con max-width
export const Container = styled.div`
  max-width: ${layout.containerMaxWidth};
  margin: 0 auto;
  padding: ${layout.contentPaddingMobile};

  ${mediaQuery.tablet} {
    padding: ${layout.contentPadding};
  }
`;

// Sección con espaciado vertical
export const Section = styled.section`
  padding: ${layout.sectionSpacingMobile} 0;

  ${mediaQuery.tablet} {
    padding: ${layout.sectionSpacing} 0;
  }
`;

// Grid responsivo para posters/cards
export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${layout.gridColumns.mobile};
  gap: ${layout.gridGapMobile};

  ${mediaQuery.tablet} {
    grid-template-columns: ${layout.gridColumns.tablet};
    gap: ${layout.gridGap};
  }

  ${mediaQuery.desktop} {
    grid-template-columns: ${layout.gridColumns.desktop};
  }
`;

// Título de sección
export const SectionTitle = styled.h2`
  color: ${colors.text};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${layout.componentSpacing};
  padding: 0 ${layout.contentPaddingMobile};

  ${mediaQuery.tablet} {
    font-size: 2rem;
    padding: 0;
  }
`;

// Descripción/subtítulo de sección
export const SectionDescription = styled.p`
  color: ${colors.textSecondary};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: ${layout.componentSpacing};
  padding: 0 ${layout.contentPaddingMobile};

  ${mediaQuery.tablet} {
    font-size: 1.1rem;
    padding: 0;
  }
`;
