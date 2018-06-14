const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const eslintFormatter = require('eslint-friendly-formatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');

const publicPath = './';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);
const shouldUseRelativeAssetPaths = publicPath === './';

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

const postCssLoader = {
  loader: require.resolve('postcss-loader'),
  options: {
    ident: 'postcss',
    sourceMap: shouldUseSourceMap,
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
    minimize: true,
    sourceMap: shouldUseSourceMap,
  },
};
const styleLoader = {
  loader: require.resolve('style-loader'),
  options: {
    hmr: false,
  },
};

const ComponentList = ['Button', 'Icon', 'Fab', 'IconToggle', 'Card'];

module.exports = ComponentList.map((Component) => {
  const cssFilename = `${Component}/${Component}.css?[contenthash:8]`;
  const sassFileName = `${Component}/${Component}.css?[hash:8]`;
  const extractTextPluginOptions = shouldUseRelativeAssetPaths
    ? { publicPath: Array(cssFilename.split('/').length).join('../') }
    : {};
  const ExtractCSS = new ExtractTextPlugin({ filename: cssFilename });
  const ExtractSASS = new ExtractTextPlugin({ filename: sassFileName });
  return {
    mode: 'production',
    bail: true,
    devtool: shouldUseSourceMap ? 'source-map' : false,
    entry: {
      index: path.resolve(paths.appBuildSrc, `${Component}/index.js`),
    },
    output: {
      path: paths.appBuild,
      filename: `${Component}/[name].js`,
      publicPath,
      library: 'mrcw',
      libraryTarget: 'commonjs2',
      devtoolModuleFilenameTemplate: info =>
        path.relative(paths.appBuildSrc, info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    externals: [
      {
        'material-components-web': {
          root: 'material-components-web',
          commonjs2: 'material-components-web',
          commonjs: 'material-components-web',
          amd: 'material-components-web',
          umd: 'material-components-web',
        },
      },
      ...[
        'animation',
        'auto-init',
        'base',
        'button',
        'card',
        'checkbox',
        'dialog',
        'drawer',
        'elevation',
        'fab',
        'form-field',
        'grid-list',
        'icon-toggle',
        'layout-grid',
        'linear-progress',
        'list',
        'menu',
        'radio',
        'ripple',
        'rtl',
        'select',
        'selection-control',
        'slider',
        'snackbar',
        'switch',
        'tabs',
        'textfield',
        'theme',
        'toolbar',
        'typography',
      ].map((name) => {
        const parts = name.split('-');
        const upperName =
          parts.length > 1
            ? `${parts[0]}${parts[1].charAt(0).toUpperCase()}${parts[1].slice(1)}`
            : name;
        const moduleName = `@material/${name}/dist/mdc.${upperName}`;

        return {
          [moduleName]: {
            root: moduleName,
            commonjs2: moduleName,
            commonjs: moduleName,
            amd: moduleName,
            umd: moduleName,
          },
        };
      }),
      {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
          umd: 'react',
        },
      },
      {
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom',
          umd: 'react-dom',
        },
      },
      {
        classnames: {
          root: 'classNames',
          commonjs2: 'classnames',
          commonjs: 'classnames',
          amd: 'classnames',
          umd: 'classnames',
        },
      },
      {
        'prop-types': {
          root: 'PropTypes',
          commonjs2: 'prop-types',
          commonjs: 'prop-types',
          amd: 'prop-types',
          umd: 'prop-types',
        },
      },
    ],
    resolve: {
      modules: ['node_modules', paths.appNodeModules].concat(process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
      extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.sass', '.scss'],
      alias: {
        'react-native': 'react-native-web',
      },
      plugins: [new ModuleScopePlugin(paths.appBuildSrc, [paths.appPackageJson])],
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
          include: paths.appBuildSrc,
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.eot$/, /\.ttf$/, /\.woff?2$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/[name].[ext]?[hash:8]',
              },
            },
            {
              test: /\.(js|jsx|mjs)$/,
              include: paths.appBuildSrc,
              loader: require.resolve('babel-loader'),
              options: {
                compact: true,
              },
            },
            {
              test: /\.css$/,
              loader: ExtractCSS.extract(Object.assign(
                {
                  fallback: styleLoader,
                  use: [cssLoader, postCssLoader],
                },
                extractTextPluginOptions,
              )),
            },
            {
              test: /\.(sa|sc|c)ss$/,
              loader: ExtractSASS.extract(Object.assign(
                {
                  fallback: styleLoader,
                  use: [
                    cssLoader,
                    postCssLoader,
                    {
                      loader: require.resolve('sass-loader'),
                      options: {
                        includePaths: [paths.appNodeModules],
                        sourceMap: shouldUseSourceMap,
                      },
                    },
                  ],
                },
                extractTextPluginOptions,
              )),
            },
            {
              loader: require.resolve('file-loader'),
              exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/[name].[ext]?[hash:8]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(env.stringified),
      ExtractCSS,
      ExtractSASS,
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    optimization: {
      minimize: false,
    },
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
  };
});
