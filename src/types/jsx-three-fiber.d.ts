import { NativeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements extends NativeElements {
      group: any;
      mesh: any;
      ambientLight: any;
      pointLight: any;
      sphereGeometry: any;
      boxGeometry: any;
      cylinderGeometry: any;
      coneGeometry: any;
      torusGeometry: any;
      dodecahedronGeometry: any;
      tetrahedronGeometry: any;
      meshStandardMaterial: any;
      primitive: any;
    }
  }
} 