/// <reference types="react-scripts" />

/**
 * Correção para problemas de compatibilidade entre 
 * styled-components, framer-motion e Three.js
 */

// Habilitar importação de arquivos
declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
declare module '*.json';
declare module '*.gltf';
declare module '*.glb';

// Resolver problemas com Framer Motion
declare namespace JSX {
  interface IntrinsicAttributes {
    [key: string]: any;
  }
}

// Resolver problemas com styled-components
declare module 'styled-components' {
  export interface ThemedStyledFunction<E extends keyof JSX.IntrinsicElements | React.ComponentType<any>, T extends object, O extends object = {}, A extends keyof any = never> {
    (first: any, ...rest: any[]): any;
  }

  export interface ThemedBaseStyledInterface<T extends object> {
    [tag: string]: ThemedStyledFunction<any, T>;
  }

  export const styled: ThemedBaseStyledInterface<any> & {
    [key: string]: any;
  };
}

// Resolver problemas com framer-motion
declare module 'framer-motion' {
  export const motion: {
    [key: string]: any;
  };
  
  export interface MotionProps {
    [key: string]: any;
  }
  
  export function useTransform(value: any, inputRange: any, outputRange: any): any;
  export function useScroll(options?: any): any;
}

// Resolver problemas com three
declare module 'three' {
  export interface Group {
    [key: string]: any;
  }
  
  export interface Mesh {
    [key: string]: any;
  }
  
  export interface Material {
    [key: string]: any;
  }
  
  export interface Object3D {
    [key: string]: any;
  }
}

// Resolver problemas com @react-three/fiber
declare module '@react-three/fiber' {
  export function Canvas(props: any): JSX.Element;
  export function useFrame(callback: any): void;
  export const events: any;
}

// Resolver problemas com @react-three/drei
declare module '@react-three/drei' {
  export function OrbitControls(props?: any): JSX.Element;
  export function PerspectiveCamera(props?: any): JSX.Element;
  export function useGLTF(path: string): any;
  export function Sphere(props?: any): JSX.Element;
} 