import React from 'react';
import * as S from './styles';
import { Header } from '../Header';

export function Layout({ children }) {
  return (
    <S.Wrapper>
      <Header />
      <S.Main>{children}</S.Main>
    </S.Wrapper>
  );
}

// Componentes auxiliares exportados para usar en páginas
export const Container = S.Container;
export const Section = S.Section;
export const Grid = S.Grid;