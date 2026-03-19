import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
  z-index: 2000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const Modal = styled.div`
  background-color: ${colors.background};
  width: 90%;
  max-width: 700px;
  max-height: 80vh;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from { 
      transform: translateY(-20px);
      opacity: 0;
    }
    to { 
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${colors.backgroundLight};

  h2 {
    color: ${colors.text};
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.hover};
    color: ${colors.text};
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 1.25rem 2rem;
  border: none;
  border-bottom: 2px solid ${colors.backgroundLight};
  font-size: 1.1rem;
  color: ${colors.text};
  background-color: transparent;
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${colors.textSecondary};
  }

  &:focus {
    border-bottom-color: ${colors.primary};
  }
`;

export const Results = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${colors.textSecondary};
  font-size: 1rem;
`;

export const Section = styled.div`
  margin-bottom: 1.5rem;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  color: ${colors.textSecondary};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.hover};
  }
`;

export const ResultIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundLight};
  border-radius: 8px;
  color: ${colors.primary};
  flex-shrink: 0;
`;

export const ResultInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ResultTitle = styled.div`
  color: ${colors.text};
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ResultSubtitle = styled.div`
  color: ${colors.textSecondary};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;