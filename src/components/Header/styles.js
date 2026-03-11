import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4%;
  background: linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent);
  transition: background-color 0.3s ease;
  z-index: 1000;

  &:hover {
    background-color: rgba(20, 20, 20, 0.95);
  }
`;

export const Logo = styled.h1`
  color: ${colors.primary};
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  flex: 1;
  margin-left: 3rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  color: ${props => props.active ? colors.text : colors.textSecondary};
  font-size: 0.95rem;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: ${colors.primary};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${colors.text};
    
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
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.15);
  }
`;

export const UserIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.15);
  }
`;
