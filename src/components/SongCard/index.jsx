import React from 'react';
import * as S from './styles';

export function SongCard({ title, artist, genre, image, onClick }) {
  return (
    <S.Card onClick={onClick}>
      <S.ImageContainer>
        <S.Image src={image} alt={title} />
        <S.Overlay>
          <S.PlayIcon>▶</S.PlayIcon>
        </S.Overlay>
      </S.ImageContainer>
      
      <S.Info>
        <S.Title>{title}</S.Title>
        <S.Artist>{artist}</S.Artist>
        <S.Genre>{genre}</S.Genre>
      </S.Info>
    </S.Card>
  );
}
