import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './styles';
import { FiSearch, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { SearchModal } from '../SearchModal';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const { logout, role } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar dropdown al click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
  };

  return (
    <>
      <S.Container $scrolled={scrolled}>
        <S.Logo $scrolled={scrolled} onClick={() => navigate('/')}>
          Academia de Arte Musical
        </S.Logo>

        <S.Nav>
          <S.NavLink onClick={() => navigate('/')} $active={location.pathname === '/'}>
            Inicio
          </S.NavLink>
          <S.NavLink onClick={() => scrollToSection('generos-section')}>
            Géneros
          </S.NavLink>
          <S.NavLink onClick={() => scrollToSection('albumes-section')}>
            Álbumes
          </S.NavLink>
        </S.Nav>

        <S.Actions>
          <S.IconButton title="Buscar" onClick={() => setSearchOpen(true)}>
            <FiSearch size={22} />
          </S.IconButton>

          <S.UserMenuWrapper ref={menuRef}>
            <S.UserButton onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <FiUser size={20} />
              <S.RoleBadge $admin={role === 'admin'}>
                {role === 'admin' ? 'Admin' : 'Alumno'}
              </S.RoleBadge>
              <FiChevronDown size={14} style={{
                transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }} />
            </S.UserButton>

            {userMenuOpen && (
              <S.Dropdown>
                <S.DropdownHeader>
                  <S.DropdownRole $admin={role === 'admin'}>
                    {role === 'admin' ? '⚡ Administrador' : '🎵 Alumno'}
                  </S.DropdownRole>
                </S.DropdownHeader>
                <S.DropdownDivider />
                <S.DropdownItem onClick={handleLogout}>
                  <FiLogOut size={15} />
                  Cerrar sesión
                </S.DropdownItem>
              </S.Dropdown>
            )}
          </S.UserMenuWrapper>
        </S.Actions>
      </S.Container>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}