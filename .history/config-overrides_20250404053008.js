const path = require('path');

module.exports = function override(config, env) {
  // Permitir transpilação de node_modules para @react-three/fiber e @react-three/drei
  config.module.rules.push({
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    include: [
      path.resolve(__dirname, 'node_modules/@react-three/fiber'),
      path.resolve(__dirname, 'node_modules/@react-three/drei'),
      path.resolve(__dirname, 'node_modules/three'),
    ],
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript'
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-transform-runtime'
        ]
      }
    }
  });

  // Adicionar resolvedores para arquivos problemáticos
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      zlib: false,
    },
    alias: {
      ...config.resolve.alias,
      'three-stdlib': path.resolve(__dirname, 'node_modules/three-stdlib'),
      'fflate': path.resolve(__dirname, 'node_modules/fflate'),
      '@': path.resolve(__dirname, 'src'),
    },
  };

  // Ignorar warning de tamanho de pacotes
  config.performance = {
    ...config.performance,
    hints: false,
  };

  // Configurar source-map-loader para ignorar módulos problemáticos
  config.module.rules.forEach(rule => {
    if (rule.use && Array.isArray(rule.use) && rule.use.some(use => use.loader && use.loader.includes('source-map-loader'))) {
      rule.exclude = [
        /node_modules\/three-stdlib/,
        /node_modules\/fflate/,
        /\bnode_modules\b/
      ];
    }
  });

  return config;
}; 