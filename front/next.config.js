const withBundleAnalyzer = require('@next/bundle-analyzer');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = withBundleAnalyzer({
  distDir: '.next',
  enabled: process.env.ANALYZE === 'true',
  webpack(config) {
    const isProduction = process.env.NODE_ENV === 'production';
    const plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ko/),
    ];
    if (isProduction) {
      plugins.push(new CompressionPlugin());
    }

    return {
      ...config,
      mode: isProduction ? 'production' : 'development',
      devtool: isProduction ? 'hidden-source-map' : 'eval',
      module: {
        ...config.module,
        rules: [
          ...config.rules,
          {
            loader: 'webpack-ant-icon-loader',
            enforce: 'pre',
            include: [
              require.resolve('@ant-design/icons/lib/dist'),
            ],
          },
        ],
      },
      plugins,
    };
  },
});
