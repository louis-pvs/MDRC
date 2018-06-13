const paths = require('./config/paths');
const autoprefixer = require('autoprefixer');

const postCssLoader = {
  loader: require.resolve('postcss-loader'),
  options: {
    ident: 'postcss',
    plugins: () => [
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

export const sassRules = {
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
};

export default {
  title: 'MRCW Docs',
  description: 'A layer of React wrapper for official Material Components (Web)',
  debug: true,
  dest: './doc',
  modifyBundlerConfig: (config) => {
    config.module.rules.push(sassRules);
    return config;
  },
};
