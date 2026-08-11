const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

process.env.EXPO_ROUTER_APP_ROOT = './app';

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

config.resolver.disableHierarchicalLookup = true;

module.exports = config;
