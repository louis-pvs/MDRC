// doczrc.js
const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const paths = require('./config/paths');

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

export default {
  source: paths.appLib,
  dest: paths.doc,
  base: 'https://louis-pvs.github.io/mrcw/',
  title: 'mrcw',
  description: 'A layer of React wrapper for official Material Components',
  themeConfig: {
    colors: {
      primary: '#518aff',
      gray: '#fafafa',
    },
  },
  modifyBundlerConfig: function modifier(config) {
    config.resolve.alias.react = path.resolve(paths.appNodeModules, 'react');
    config.module.rules.push({
      test: /\.css$/,
      use: [require.resolve('style-loader'), cssLoader, postCssLoader],
    });
    config.module.rules.push({
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
    });

    return config;
  },
};
