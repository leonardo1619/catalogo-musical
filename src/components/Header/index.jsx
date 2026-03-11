import React from 'react';
import * as S from './styles';

export function Header() {
  return (
    <S.Container>
      <S.Logo>🎵 Academia de Arte Musical</S.Logo>
      
      <S.Nav>
        <S.NavLink active>Inicio</S.NavLink>
        <S.NavLink>Banda</S.NavLink>
        <S.NavLink>Jazz</S.NavLink>
        <S.NavLink>Soundtracks</S.NavLink>
      </S.Nav>

      <S.Actions>
        <S.SearchIcon>🔍</S.SearchIcon>
        <S.UserIcon>👤</S.UserIcon>
      </S.Actions>
    </S.Container>
  );
}
