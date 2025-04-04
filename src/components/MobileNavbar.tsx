import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const NavbarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  padding: 12px 0 8px;
  z-index: 100;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavItems = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 5px 0;
  color: ${({ theme }) => theme.textSecondary};
  transition: color 0.3s ease;
  font-size: 0.7rem;
  
  &.active {
    color: #00BCD4;
    
    svg {
      fill: #00BCD4;
    }
  }
  
  &:hover {
    color: #00BCD4;
    
    svg {
      fill: #00BCD4;
    }
  }
  
  svg {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
    fill: ${({ theme }) => theme.textSecondary};
    transition: fill 0.3s ease;
  }
`;

// Icons
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const ServicesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M21.71 18.29l-4.29-4.29v-1.59c1.73-1.76 2.71-4.11 2.58-6.58-.3-4.51-4.02-8.29-8.53-8.13-4 .15-7.3 3.37-7.68 7.36-.32 3.36 1.46 6.38 4.21 7.94v2.29l-4.29 4.29c-.17.17-.29.39-.29.71 0 .55.45 1 1 1h16c.55 0 1-.45 1-1 0-.32-.12-.54-.29-.71zM13 17h-2v-6.9c-.36-.06-.7-.16-1.03-.29-.01 0-.02-.01-.03-.01-.24-.1-.48-.22-.7-.35l-.17-.11c-.17-.11-.33-.23-.49-.36-.12-.1-.24-.21-.35-.32l-.38-.4-.23-.27c-.08-.1-.16-.21-.24-.32-.1-.16-.21-.31-.3-.48-.06-.11-.11-.22-.16-.33-.09-.19-.16-.38-.23-.58l-.07-.21c-.05-.15-.09-.31-.12-.47l-.08-.38c-.03-.14-.05-.28-.07-.42-.02-.15-.03-.31-.04-.46 0-.1-.01-.2-.01-.31 0-.06 0-.12 0-.18 0-.13.01-.26.02-.39.01-.18.03-.36.06-.54l.05-.29c.03-.13.06-.26.1-.39.05-.16.1-.32.16-.48.02-.06.04-.12.07-.17.01-.01.01-.03.02-.04.02-.05.04-.09.07-.14.05-.11.11-.22.17-.33.01-.02.02-.03.03-.05.09-.16.19-.32.3-.47.01-.02.03-.04.04-.05.09-.13.19-.25.3-.37.04-.05.08-.09.12-.14.07-.08.15-.16.22-.24.12-.12.23-.23.35-.34.04-.04.09-.08.13-.12l.29-.24c.1-.08.2-.15.3-.22.02-.02.05-.04.08-.06.01-.01.02-.01.03-.02.12-.08.24-.16.37-.23l.11-.06c.13-.07.26-.14.4-.2l.15-.07c.14-.06.28-.11.42-.16.01 0 .01 0 .02-.01.16-.05.32-.1.48-.14.08-.02.16-.04.23-.05.14-.03.27-.05.41-.07l.13-.02c.16-.02.32-.04.48-.05H12c.15.01.31.03.47.05l.13.02c.14.02.27.04.41.07.08.01.16.03.23.05.16.04.32.09.48.14.01 0 .01 0 .02.01.14.05.29.1.42.16l.15.07c.14.06.27.13.4.2l.11.06c.13.07.25.15.37.23.01.01.02.01.03.02.02.02.05.04.08.06.1.07.2.14.3.22l.29.24c.04.04.09.08.13.12.12.11.24.22.35.34.07.08.15.16.22.24.04.05.08.1.12.14.1.12.2.24.3.37.01.02.03.04.04.05.1.15.2.31.3.47.01.02.02.03.03.05.06.11.12.22.17.33.03.05.05.09.07.14.01.01.01.03.02.04.03.06.05.12.07.17.06.16.11.32.16.48.04.13.07.26.1.39l.05.29c.03.18.05.35.06.54.01.13.02.26.02.39 0 .06 0 .12 0 .18 0 .1-.01.2-.01.31-.01.15-.02.31-.04.46-.02.14-.04.28-.07.42l-.08.38c-.03.16-.07.32-.12.47l-.07.21c-.07.2-.14.39-.23.58-.05.11-.1.22-.16.33-.09.17-.19.32-.3.48-.08.11-.16.22-.24.32l-.23.27-.38.4c-.11.11-.23.22-.35.32-.16.13-.32.25-.49.36l-.17.11c-.23.14-.47.26-.7.35-.01 0-.02.01-.03.01-.33.13-.67.23-1.03.29V17z" />
  </svg>
);

const AboutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v6h-2zm0-4h2v2h-2z" />
  </svg>
);

const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
  </svg>
);

const navVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.6, 0.05, 0.01, 0.9]
    }
  }
};

const MobileNavbar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <NavbarContainer 
      as={motion.div}
      component="nav"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <NavItems>
        <NavItem>
          <StyledNavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            <HomeIcon />
            {t('header.home')}
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/services" className={location.pathname === '/services' ? 'active' : ''}>
            <ServicesIcon />
            {t('header.services')}
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            <AboutIcon />
            {t('header.about')}
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            <ContactIcon />
            {t('header.contact')}
          </StyledNavLink>
        </NavItem>
      </NavItems>
    </NavbarContainer>
  );
};

export default MobileNavbar;
