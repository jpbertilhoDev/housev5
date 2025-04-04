// Permitir importação de arquivos estáticos
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: Record<string, any>;
  export default content;
}

// Resolver problemas com styled-components e framer-motion
import { FC, ComponentProps, ForwardRefExoticComponent, RefAttributes, ComponentType } from 'react';
import { StyledComponent } from 'styled-components';
import { motion } from 'framer-motion';

type ValidComponent = 
  | string 
  | ComponentType<any> 
  | ForwardRefExoticComponent<any>;

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      as?: ValidComponent;
    }
  }
}

declare module 'framer-motion' {
  // Complementar a tipagem do motion para elementos HTML
  export interface HTMLMotionProps<T extends keyof JSX.IntrinsicElements> 
    extends Omit<ComponentProps<T>, "style"> {
    style?: any;
    [key: string]: any;
  }

  // Permitir que styled(motion.*) funcione com TypeScript
  export interface CustomDomComponent<Props> 
    extends ForwardRefExoticComponent<Props & RefAttributes<any>> {
    [key: string]: any;
  }
  
  // Extensão para o tipo 'motion'
  interface Motion {
    [key: string]: any;
  }
} 