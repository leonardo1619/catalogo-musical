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
  background-color: ${props => props.$scrolled 
    ? 'rgba(255, 255, 255, 0.85)' 
    : 'transparent'};
  ${props => props.$scrolled && `
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    height: 70px;
  `}
  transition: all 0.5s ease;
  z-index: 1000;
`;

export const Logo = styled.h1`
  color: ${colors.primary};
  font-size: ${props => props.$scrolled ? '1.5rem' : '1.8rem'};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.5s ease;
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover { 
    transform: scale(1.05); 
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 2.5rem;
  flex: 1;
  justify-content: flex-start;
  margin: 0 4rem;
  
  @media (max-width: 768px) { 
    display: none; 
  }
`;

export const NavLink = styled.a`
  color: ${props => props.$active ? colors.primary : '#050708'};
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;
  padding: 0.5rem 1rem;
  white-space: nowrap;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    background-color: ${colors.primary};
    transition: width 0.3s ease;
  }
  
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
  flex-shrink: 0;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: #050708;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover { 
    background-color: ${colors.hover};
    color: ${colors.primary};
    transform: scale(1.1); 
  }
`;
export const UserMenuWrapper = styled.div`
  position: relative;
`;

export const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid rgba(103, 169, 67, 0.3);
  border-radius: 20px;
  padding: 6px 12px;
  cursor: pointer;
  color: #050708;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(103, 169, 67, 0.08);
    border-color: #67A943;
  }
`;

export const RoleBadge = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.$admin ? '#4D7F39' : '#67A943'};
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border: 1px solid rgba(103, 169, 67, 0.2);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  min-width: 180px;
  overflow: hidden;
  z-index: 100;
`;

export const DropdownHeader = styled.div`
  padding: 12px 16px;
  background: rgba(103, 169, 67, 0.06);
`;

export const DropdownRole = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.$admin ? '#4D7F39' : '#67A943'};
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: rgba(103, 169, 67, 0.15);
`;

export const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background 0.2s ease;
  text-align: left;

  &:hover {
    background: rgba(255, 80, 80, 0.06);
    color: #e53e3e;
  }
`;