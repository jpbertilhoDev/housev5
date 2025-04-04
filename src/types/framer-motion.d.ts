declare module 'framer-motion' {
  export const motion: {
    div: any;
    h1: any;
    h2: any;
    h3: any;
    p: any;
    span: any;
    button: any;
    a: any;
    group: any;
    // Outros elementos comuns
  };

  export function useScroll(options?: any): { 
    scrollX: any; 
    scrollY: any;
    scrollXProgress: any;
    scrollYProgress: any;
  };
  
  export function useTransform(value: any, from: any, to: any): any;
  
  export interface AnimatePresenceProps {
    children: React.ReactNode;
    exitBeforeEnter?: boolean;
    initial?: boolean;
    onExitComplete?: () => void;
  }
  
  export function AnimatePresence(props: AnimatePresenceProps): JSX.Element;
} 