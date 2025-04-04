import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

// Define theme types
interface Theme {
  body: string;
  text: string;
  textSecondary: string;
  background: string;
  backgroundAlt: string;
  cardBackground: string;
  border: string;
  borderColor: string;
  primary: string;
  secondary: string;
  buttonText: string;
}

// Define theme values
const lightTheme: Theme = {
  body: '#FFFFFF',
  text: '#1A202C',
  textSecondary: '#4A5568',
  background: '#F7FAFC',
  backgroundAlt: '#EDF2F7',
  cardBackground: '#FFFFFF',
  border: '#E2E8F0',
  borderColor: '#E2E8F0',
  primary: '#1E3A8A',
  secondary: '#F59E0B',
  buttonText: '#FFFFFF'
};

const darkTheme: Theme = {
  body: '#1A202C',
  text: '#F7FAFC',
  textSecondary: '#A0AEC0',
  background: '#171923',
  backgroundAlt: '#2D3748',
  cardBackground: '#2D3748',
  border: '#4A5568',
  borderColor: '#4A5568',
  primary: '#3182CE',
  secondary: '#F6AD55',
  buttonText: '#FFFFFF'
};

// Create context
type ThemeContextType = {
  theme: Theme;
  isDarkTheme: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? true : false;
  });

  const theme = isDarkTheme ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ theme, isDarkTheme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 