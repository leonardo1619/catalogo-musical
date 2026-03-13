import React from 'react';
import * as S from './styles';

export function GenreCard({ name, image, songsCount, artistsCount, onClick }) {
  return (
    <S.Card onClick={onClick}>
      <S.ImageContainer>
        <S.Image src={image} alt={name} />
      </S.ImageContainer>
      
      <S.Info>
        <S.Title>{name}</S.Title>
        <S.Stats>
          <S.Stat>+ {songsCount} Canciones</S.Stat>
          <S.Stat>{artistsCount} Artistas</S.Stat>ß
        </S.Stats>
      </S.Info>
    </S.Card>
  );
}