import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './styles';
import { FiSearch, FiUser } from 'react-icons/fi';
import { SearchModal } from '../SearchModal';  // ← LÍNEA 1 NUEVA

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);  // ← LÍNEA 2 NUEVA
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    // Si no estamos en home, navegar primero
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      // Si ya estamos en home, solo hacer scroll
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <S.Container $scrolled={scrolled}>
        <S.Logo 
          $scrolled={scrolled}
          onClick={() => navigate('/')}
        >
          🎵 Academia de Arte Musical
        </S.Logo>
        
        <S.Nav>
          <S.NavLink 
            onClick={() => navigate('/')}
            $active={location.pathname === '/'}
          >
            Inicio
          </S.NavLink>
          <S.NavLink 
            onClick={() => scrollToSection('generos-section')}
          >
            Géneros
          </S.NavLink>
          <S.NavLink 
            onClick={() => scrollToSection('albumes-section')}
          >
            Álbumes
          </S.NavLink>
        </S.Nav>
        
        <S.Actions>
          <S.IconButton 
            title="Buscar"
            onClick={() => setSearchOpen(true)}  // ← MODIFICADO
          >
            <FiSearch size={22} />
          </S.IconButton>
          <S.IconButton title="Usuario">
            <FiUser size={22} />
          </S.IconButton>
        </S.Actions>
      </S.Container>

      {/* Modal de Búsqueda - LÍNEA 3 NUEVA */}
      <SearchModal 
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}