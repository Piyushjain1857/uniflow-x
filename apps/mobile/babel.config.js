module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      function () {
        return {
          visitor: {
            MemberExpression(path) {
              if (path.matchesPattern('process.env.EXPO_ROUTER_APP_ROOT')) {
                path.replaceWith({ type: 'StringLiteral', value: './app' });
              }
              if (path.matchesPattern('process.env.EXPO_ROUTER_IMPORT_MODE')) {
                path.replaceWith({ type: 'StringLiteral', value: 'sync' });
              }
            },
          },
        };
      },
    ],
  };
};
