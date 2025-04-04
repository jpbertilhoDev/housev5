/// <reference path="./styled-components-with-motion.d.ts" />
/// <reference path="./jsx-three-fiber.d.ts" />
/// <reference path="./styled-components-env.d.ts" />
/// <reference path="./styled-components-fix.d.ts" />
/// <reference path="../custom.d.ts" />
/// <reference path="../vite-env.d.ts" />

// Tipo global para qualquer elemento HTML ou SVG com moção
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Solução para trabalhar com framer-motion
declare module 'framer-motion' {
  // Permitir qualquer elemento HTML como propriedade de motion
  export interface HTMLMotionProps<T> {
    [key: string]: any;
  }

  // Permitir qualquer elemento como propriedade de motion
  export const motion: Record<string, any>;
}

// Resolver problemas com styled-components
declare module 'styled-components' {
  export function styled(component: any): any;
}

// Exportações específicas para React Three Fiber
declare module '@react-three/fiber' {
  export function useFrame(callback: (state: any) => void): void;
  export function Canvas(props: any): JSX.Element;
}

// Exportações específicas para React Three Drei
declare module '@react-three/drei' {
  export function OrbitControls(props: any): JSX.Element;
  export function Sphere(props: any): JSX.Element;
} 