const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const eslintFormatter = require('eslint-friendly-formatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');

const getClientEnvironment = require('./env');
const paths = require('./paths');

const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

const postCssLoader = {
  loader: require.resolve('postcss-loader'),
  options: {
    ident: 'postcss',
    plugins: () => [
      postcssFlexbugsFixes,
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
        flexbox: 'no-2009',
      }),
    ],
  },
};
const cssLoader = {
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1,
  },
};

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('@babel/polyfill'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ],
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.scss', '.sass'],
    alias: {
      'react-native': 'react-native-web',
      'material-design-icons': paths.materialIcon,
      lib: paths.appBuildSrc,
    },
    plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            loader: require.resolve('eslint-loader'),
            options: {
              eslintPath: require.resolve('eslint'),
              formatter: eslintFormatter,
              quiet: true,
            },
          },
        ],
        include: [paths.appSrc, paths.appBuildSrc],
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: [paths.appSrc, paths.appBuildSrc],
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          },
          {
            test: /\.css$/,
            use: [require.resolve('style-loader'), cssLoader, postCssLoader],
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              require.resolve('style-loader'),
              cssLoader,
              postCssLoader,
              {
                loader: require.resolve('sass-loader'),
                options: { includePaths: [paths.appNodeModules] },
              },
            ],
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new InterpolateHtmlPlugin(env.raw),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: false,
  },
};
