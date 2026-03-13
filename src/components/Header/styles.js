import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4%;
  
  /* Estado normal: transparente */
  background-color: ${props => props.$scrolled 
    ? 'rgba(255, 255, 255, 0.85)' 
    : 'transparent'
  };
  
  /* Glassmorphism cuando scrolled */
  ${props => props.$scrolled && `
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  `}
  
  transition: all 0.5s ease;
  z-index: 1000;
  
  /* Ajustar altura al hacer scroll */
  ${props => props.$scrolled && `
    height: 70px;
  `}
`;

export const Logo = styled.h1`
  color: ${colors.primary};
  font-size: ${props => props.$scrolled ? '1.5rem' : '1.8rem'};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.5s ease;
  white-space: nowrap;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 2.5rem;
  flex: 1;
  justify-content: center;
  margin-left: 3rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  color: #050708;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;
  padding: 0 1.25rem;

  /* Subrayado */
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: ${colors.primary};
    transition: width 0.3s ease;
  }

  /* Item activo */
  ${props => props.active && `
    color: ${colors.primary};
  `}

  &:hover {
    color: ${colors.primary};
    
    &::after {
      width: 100%;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const SearchIcon = styled.div`
  font-size: 1.3rem;
  color: #050708;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.15);
    color: ${colors.primary};
  }
`;

export const UserIcon = styled.div`
  font-size: 1.5rem;
  color: #050708;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.15);
    color: ${colors.primary};
  }
`;