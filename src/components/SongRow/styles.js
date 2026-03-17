import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Row = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 150px 80px;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid ${colors.backgroundLight};
  
  &:hover {
    background-color: ${colors.hover};
    
    > div:last-child {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 50px 1fr 60px;
    
    > div:nth-child(3) { /* Difficulty */
      display: none;
    }
  }
`;

export const Number = styled.div`
  color: ${colors.textSecondary};
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
`;

export const Title = styled.h3`
  color: ${colors.text};
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Difficulty = styled.div`
  color: ${props => {
    switch(props.$level) {
      case 'Principiante': return '#22c55e';
      case 'Intermedio': return '#f59e0b';
      case 'Avanzado': return '#ef4444';
      default: return colors.textSecondary;
    }
  }};
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DownloadButton = styled.div`
  color: ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${colors.primaryDark};
    transform: scale(1.2);
  }
  
  ${Row}:hover & {
    opacity: 1;
  }
`;