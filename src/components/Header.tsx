import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding: 0.9rem 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #00BCD4;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #0097A7;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-left: 2rem;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;
  position: relative;
  
  &:hover {
    color: #00BCD4;
  }
  
  &.active {
    color: #00BCD4;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #00BCD4;
      transform: scaleX(1);
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #00BCD4;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
`;

const LanguageSelector = styled.div`
  position: relative;
  margin-left: 2rem;
`;

const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem;
  
  &:hover {
    color: #00BCD4;
  }
  
  svg {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
`;

const LanguageDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 150px;
  margin-top: 0.5rem;
`;

const LanguageOption = styled.button`
  display: block;
  width: 100%;
  padding: 10px 15px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 188, 212, 0.1);
    color: #00BCD4;
  }
  
  &.active {
    background-color: rgba(0, 188, 212, 0.2);
    color: #00BCD4;
    font-weight: 500;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  padding: 0.5rem;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.background};
    z-index: 999;
    padding: 5rem 2rem 2rem;
  }
`;

const MobileNavItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MobileNavItem = styled.li`
  margin-bottom: 1.5rem;
  
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    font-size: 1.5rem;
    font-weight: 600;
    transition: color 0.3s ease;
    display: block;
    
    &:hover, &.active {
      color: #00BCD4;
    }
  }
`;

const MobileLanguageOptions = styled.div`
  margin-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  padding-top: 1.5rem;
  
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const LanguageToggleBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const LanguageToggleButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${({ active, theme }) => active ? '#00BCD4' : theme.borderColor};
  background-color: ${({ active }) => active ? 'rgba(0, 188, 212, 0.1)' : 'transparent'};
  color: ${({ active }) => active ? '#00BCD4' : 'inherit'};
  font-weight: ${({ active }) => active ? '500' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 188, 212, 0.1);
    border-color: #00BCD4;
  }
`;

// Language options
const languages = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' }
];

// Globe Icon for language selector
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Menu Icons
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsLanguageDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(prev => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">House of Digital Business</Logo>
        
        <Nav>
          <NavItems>
            <NavItem>
              <StyledNavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
                {t('header.home')}
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/services" className={location.pathname === '/services' ? 'active' : ''}>
                {t('header.services')}
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                {t('header.about')}
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                {t('header.contact')}
              </StyledNavLink>
            </NavItem>
          </NavItems>
          
          <LanguageSelector>
            <LanguageButton onClick={toggleLanguageDropdown}>
              <GlobeIcon />
              {languages.find(lang => lang.code === i18n.language)?.label || 'Language'}
            </LanguageButton>
            
            {isLanguageDropdownOpen && (
              <LanguageDropdown
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {languages.map(language => (
                  <LanguageOption
                    key={language.code}
                    onClick={() => changeLanguage(language.code)}
                    className={i18n.language === language.code ? 'active' : ''}
                  >
                    {language.label}
                  </LanguageOption>
                ))}
              </LanguageDropdown>
            )}
          </LanguageSelector>
          
          <ThemeToggle />
        </Nav>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </MobileMenuButton>
        
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <MobileNavItems>
              <MobileNavItem>
                <NavLink 
                  to="/" 
                  className={location.pathname === '/' ? 'active' : ''}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.home')}
                </NavLink>
              </MobileNavItem>
              <MobileNavItem>
                <NavLink 
                  to="/services" 
                  className={location.pathname === '/services' ? 'active' : ''}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.services')}
                </NavLink>
              </MobileNavItem>
              <MobileNavItem>
                <NavLink 
                  to="/about" 
                  className={location.pathname === '/about' ? 'active' : ''}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.about')}
                </NavLink>
              </MobileNavItem>
              <MobileNavItem>
                <NavLink 
                  to="/contact" 
                  className={location.pathname === '/contact' ? 'active' : ''}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.contact')}
                </NavLink>
              </MobileNavItem>
            </MobileNavItems>
            
            <MobileLanguageOptions>
              <h3>{t('header.language')}</h3>
              <LanguageToggleBox>
                {languages.map(language => (
                  <LanguageToggleButton
                    key={language.code}
                    active={i18n.language === language.code}
                    onClick={() => changeLanguage(language.code)}
                  >
                    {language.label}
                  </LanguageToggleButton>
                ))}
              </LanguageToggleBox>
              
              <div style={{ marginTop: '1.5rem' }}>
                <ThemeToggle />
              </div>
            </MobileLanguageOptions>
          </MobileMenu>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 