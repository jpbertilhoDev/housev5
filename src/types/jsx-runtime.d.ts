import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Three.js elementos
      mesh: any;
      ambientLight: any;
      pointLight: any;
      group: any;
      
      // Geometrias
      sphereGeometry: any;
      boxGeometry: any;
      coneGeometry: any;
      cylinderGeometry: any;
      torusGeometry: any;
      dodecahedronGeometry: any;
      tetrahedronGeometry: any;
      
      // Materiais
      meshStandardMaterial: any;
    }
  }
} 