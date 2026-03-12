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
  color: ${colors.background};
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
  background-color: ${colors.backgroundCard};
`;

export const Info = styled.div`
  padding: 1rem 0.5rem;
`;

export const Title = styled.h3`
  color: ${colors.text};
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Artist = styled.p`
  color: ${colors.textSecondary};
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Genre = styled.span`
  color: ${colors.textTertiary};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Card debe estar al final para poder referenciar los componentes anteriores
export const Card = styled.div`
  cursor: pointer;
  transition: transform ${layout.transitions.normal}, 
              box-shadow ${layout.transitions.normal};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 24px ${colors.shadowGreen};
    
    /* Ahora podemos referenciar Overlay porque ya está definido arriba */
    ${Overlay} {
      opacity: 1;
    }
    
    ${Image} {
      transform: scale(1.1);
    }
    
    ${PlayIcon} {
      transform: scale(1.1);
    }
  }
`;
