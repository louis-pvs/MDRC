// doczrc.js
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
  title: 'mrcw',
  description: 'A layer of React wrapper for official Material Components',
  themeConfig: {
    colors: {
      primary: '#518aff',
    },
  },
  modifyBundlerConfig: function modifier(config) {
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
