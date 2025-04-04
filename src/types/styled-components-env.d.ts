import 'styled-components';
import { Theme } from '../theme/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// Resolver problemas com components JSX
declare namespace React {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    as?: string | React.ComponentType<any>;
  }
} 