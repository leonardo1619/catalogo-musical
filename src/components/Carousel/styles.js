import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Section = styled.section`
  margin-bottom: 3rem;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0 4%;
`;

export const Title = styled.h2`
  color: ${colors.text};
  font-size: 2.8rem;
  font-weight: 700;
`;

export const Controls = styled.div`
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Section}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    opacity: 1;
  }
`;

export const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid ${colors.primary};
  color: ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${colors.primary};
    color: white;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(103, 169, 67, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const CarouselContainer = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding: 0 4%;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const CarouselTrack = styled.div`
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  
  > * {
    flex-shrink: 0;
  }
`;