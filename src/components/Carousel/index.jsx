import React, { useRef } from 'react';
import * as S from './styles';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export function Carousel({ title, children }) {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    const container = carouselRef.current;
    // Scroll del 80% del ancho visible (responsivo)
    const scrollAmount = container.offsetWidth * 0.8;
    
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <S.Section>
      <S.Header>
        <S.Title>{title}</S.Title>
        <S.Controls>
          <S.Button onClick={() => scroll('left')}>
            <FiChevronLeft size={24} />
          </S.Button>
          <S.Button onClick={() => scroll('right')}>
            <FiChevronRight size={24} />
          </S.Button>
        </S.Controls>
      </S.Header>
      
      <S.CarouselContainer ref={carouselRef}>
        <S.CarouselTrack>
          {children}
        </S.CarouselTrack>
      </S.CarouselContainer>
    </S.Section>
  );
}