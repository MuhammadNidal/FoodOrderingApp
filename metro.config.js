const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Configure path aliases
config.resolver.alias = {
  '@/components': path.resolve(__dirname, 'components'),
  '@/src': path.resolve(__dirname, 'src'),
  '@/hooks': path.resolve(__dirname, 'hooks'),
  '@/constants': path.resolve(__dirname, 'constants'),
  '@/assets': path.resolve(__dirname, 'assets'),
};

module.exports = config;