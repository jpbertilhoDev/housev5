const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "fs": false,
      "path": false,
      "crypto": false,
      "stream": false,
      "os": false
    },
    alias: {
      'three': path.resolve('./node_modules/three'),
      '@react-three/fiber': path.resolve('./node_modules/@react-three/fiber'),
      '@react-three/drei': path.resolve('./node_modules/@react-three/drei'),
      'framer-motion': path.resolve('./node_modules/framer-motion'),
      '@': path.resolve(__dirname, 'src'),
    }
  }
}; 