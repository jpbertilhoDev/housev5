import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../utils/ThemeProvider';

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

const ToggleLabel = styled.span`
  font-size: 0.9rem;
  margin-right: 8px;
  color: ${({ theme }) => theme.textSecondary};
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;

const ToggleButton = styled.button`
  position: relative;
  width: 50px;
  height: 26px;
  border-radius: 13px;
  background-color: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  display: flex;
  align-items: center;
  outline: none;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.2);
  }
`;

const ToggleThumb = styled(motion.div)`
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #00BCD4;
  top: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

// SVG Icons
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 9c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-16L12 0c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1s1-.45 1-1V1c0-.55-.45-1-1-1zM12 20c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1zm-9-9h2c.55 0 1-.45 1-1s-.45-1-1-1H3c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1zM5.636 4.222l-1.414 1.414c-.39.39-.39 1.02 0 1.414.39.39 1.02.39 1.414 0l1.414-1.414c.39-.39.39-1.02 0-1.414-.39-.39-1.02-.39-1.414 0zm14.142 14.142l-1.414 1.414c-.39.39-.39 1.02 0 1.414.39.39 1.02.39 1.414 0l1.414-1.414c.39-.39.39-1.02 0-1.414-.39-.39-1.02-.39-1.414 0zM5.636 19.778l1.414-1.414c.39-.39.39-1.02 0-1.414-.39-.39-1.02-.39-1.414 0l-1.414 1.414c-.39.39-.39 1.02 0 1.414.39.39 1.02.39 1.414 0zM19.778 5.636l1.414-1.414c.39-.39.39-1.02 0-1.414-.39-.39-1.02-.39-1.414 0l-1.414 1.414c-.39.39-.39 1.02 0 1.414.39.39 1.02.39 1.414 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" />
  </svg>
);

const ThemeToggle: React.FC = () => {
  const { t } = useTranslation();
  const { toggleTheme, isDarkTheme } = useThemeContext();

  return (
    <ToggleWrapper>
      <ToggleLabel>
        {isDarkTheme ? t('theme.dark') : t('theme.light')}
      </ToggleLabel>
      <ToggleButton 
        onClick={toggleTheme}
        aria-label={isDarkTheme ? t('theme.light') : t('theme.dark')}
      >
        <ToggleThumb 
          initial={false}
          animate={{ 
            x: isDarkTheme ? 24 : 2,
            transition: { type: 'spring', stiffness: 500, damping: 30 }
          }}
        >
          {isDarkTheme ? <MoonIcon /> : <SunIcon />}
        </ToggleThumb>
      </ToggleButton>
    </ToggleWrapper>
  );
};

export default ThemeToggle; 