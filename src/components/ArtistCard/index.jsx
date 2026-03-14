import React from 'react';
import * as S from './styles';

export function ArtistCard({ name, image, songsCount, onClick }) {
  return (
    <S.Card onClick={onClick}>
      <S.ImageContainer>
        <S.Image src={image} alt={name} />
        <S.Overlay>
          <S.PlayIcon>▶</S.PlayIcon>
        </S.Overlay>
      </S.ImageContainer>
      
      <S.Info>
        <S.Title>{name}</S.Title>
        <S.Stats>
          <S.Stat>{songsCount} Canciones</S.Stat>
        </S.Stats>
      </S.Info>
    </S.Card>
  );
}