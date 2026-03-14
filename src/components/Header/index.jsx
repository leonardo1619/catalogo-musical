import React, { useState, useEffect } from 'react';
import * as S from './styles';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <S.Container $scrolled={scrolled}>
      <S.Logo $scrolled={scrolled}>
         Academia de Arte Musical
      </S.Logo>
      
      <S.Nav>
        <S.NavLink active>Inicio</S.NavLink>
        <S.NavLink>Generos</S.NavLink>
        <S.NavLink>Álbumes</S.NavLink>
        <S.NavLink>Artistas</S.NavLink>
      </S.Nav>

      <S.Actions>
        <S.SearchIcon>🔍</S.SearchIcon>
        <S.UserIcon>👤</S.UserIcon>
      </S.Actions>
    </S.Container>
  );
}