import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { layout } from '../../styles/layout';

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg, 
    transparent 0%, 
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ${layout.transitions.normal};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${layout.transitions.slow};
`;

export const PlayIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${colors.primary};
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding-left: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform ${layout.transitions.fast};
`;

export const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;
  border-radius: ${layout.borderRadius.medium};
  background-color: #F5F5F5;
  border: 1px solid #E5E5E5;
`;

export const Info = styled.div`
  padding: 1.5rem 1rem;
  text-align: center;
`;

export const Title = styled.h3`
  color: ${colors.text};
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Stat = styled.span`
  color: ${colors.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
`;

export const Card = styled.div`
  cursor: pointer;
  transition: transform ${layout.transitions.normal}, 
              box-shadow ${layout.transitions.normal};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px ${colors.shadowGreen};
    
    
    ${Image} {
      transform: scale(1.05);
    }
    
  }
`;