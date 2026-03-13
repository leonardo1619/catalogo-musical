export const layout = {
  // Contenedores principales
  containerMaxWidth: '1400px',
  contentPadding: '0 4%',
  contentPaddingMobile: '0 5%',
  
  // Espaciado vertical entre secciones
  sectionSpacing: '4rem',
  sectionSpacingMobile: '2.5rem',
  componentSpacing: '2rem',
  
  // Grid de posters/canciones
  gridGap: '1.5rem',
  gridGapMobile: '1rem',
  gridColumns: {
    mobile: 'repeat(2, 1fr)',
    tablet: 'repeat(4, 1fr)',
    desktop: 'repeat(6, 1fr)',
  },
  
  // Alturas importantes
  headerHeight: '90px',
  heroHeight: '80vh',
  heroHeightMobile: '60vh',
  
  // Breakpoints (mobile-first)
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1400px',
  },
  
  // Z-index layers
  zIndex: {
    base: 1,
    dropdown: 100,
    header: 1000,
    modal: 2000,
    overlay: 3000,
  },
  
  // Transiciones comunes
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  
  // Radios de bordes
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
  },
};

// Helper para media queries
export const mediaQuery = {
  mobile: `@media (min-width: ${layout.breakpoints.mobile})`,
  tablet: `@media (min-width: ${layout.breakpoints.tablet})`,
  desktop: `@media (min-width: ${layout.breakpoints.desktop})`,
  wide: `@media (min-width: ${layout.breakpoints.wide})`,
};
