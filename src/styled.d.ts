import 'styled-components';

// Extending the DefaultTheme interface
declare module 'styled-components' {
  export interface DefaultTheme {
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
} 