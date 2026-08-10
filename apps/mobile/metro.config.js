const { getDefaultConfig } = require('expo/metro-config');

process.env.EXPO_ROUTER_APP_ROOT = './app';

const config = getDefaultConfig(__dirname);

module.exports = config;
