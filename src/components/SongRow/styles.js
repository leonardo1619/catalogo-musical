import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Row = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 150px 150px 80px;  // ← CAMBIÓ: agregamos columna
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${colors.backgroundLight};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.hover};
  }
`;

export const Number = styled.div`
  color: ${colors.textSecondary};
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
`;

export const Title = styled.div`
  color: ${colors.text};
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Genre = styled.div`
  color: ${colors.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const getDifficultyColor = (level) => {
  switch(level) {
    case 'Principiante':
      return '#22c55e';
    case 'Intermedio':
      return '#f59e0b';
    case 'Avanzado':
      return '#ef4444';
    default:
      return colors.textSecondary;
  }
};

export const Difficulty = styled.div`
  color: ${props => getDifficultyColor(props.$level)};
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DownloadButton = styled.button`
  background: none;
  border: none;
  color: ${colors.primary};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin: 0 auto;

  &:hover {
    background-color: ${colors.hover};
    transform: scale(1.1);
  }
`;