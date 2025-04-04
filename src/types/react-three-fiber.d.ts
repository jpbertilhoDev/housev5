declare module '@react-three/fiber' {
  export type RootState = {
    clock: THREE.Clock;
    // Outras propriedades...
  };

  export type FrameCallback = (state: RootState) => void;

  export function useFrame(callback: FrameCallback): void;
  export function Canvas(props: any): JSX.Element;
  export interface Object3DNode<T, P> {}
}

declare module '@react-three/drei' {
  export function OrbitControls(props: any): JSX.Element;
  export function Sphere(props: any): JSX.Element;
}

// Extendendo o Framer Motion
declare module 'framer-motion' {
  export namespace motion {
    export function group(props: any): JSX.Element;
  }
} 