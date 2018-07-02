// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', (err) => {
  throw err;
});

require('../config/env');

const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const webpack = require('webpack');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printBuildError = require('react-dev-utils/printBuildError');

const libConfig = require('../config/webpack.config.lib');
const config = require('../config/webpack.config.prod');
const paths = require('../config/paths');
const componentList = require('./componentList');

const { measureFileSizesBeforeBuild } = FileSizeReporter;
const { printFileSizesAfterBuild } = FileSizeReporter;

const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

if (!checkRequiredFiles([paths.appBuildIndexJs])) {
  process.exit(1);
}

function updateStyles() {
  const stylePath = 'styles/';
  fs.emptyDirSync(path.resolve(paths.appBuild, stylePath));
  fs.copySync(path.resolve(paths.appLib, stylePath), path.resolve(paths.appBuild, stylePath), {
    overwrite: true,
    dereference: true,
    errorOnExist: true,
  });
}

function build(component, previousFileSizes) {
  let compiler = webpack(config);
  if (component) {
    compiler = webpack(libConfig(component));
    console.log(`Creating an optimized production build on component ${chalk.cyan(component)}..`);
  } else {
    console.log(`Creating ${chalk.cyan('documentation...')}`);
  }
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI
        && (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false')
        && messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n'
              + 'Most CI servers set it automatically.\n',
          ),
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}

function printResult(componentPath, result) {
  const { stats, previousFileSizes, warnings } = result;
  let dest = paths.appBuild;
  if (componentPath) dest = componentPath;
  if (warnings.length) {
    console.log(chalk.yellow('Compiled with warnings.\n'));
    console.log(warnings.join('\n\n'));
    console.log(
      `\nSearch for the ${chalk.underline(
        chalk.yellow('keywords'),
      )} to learn more about each warning.`,
    );
    console.log(
      `To ignore, add ${chalk.cyan('// eslint-disable-next-line')} to the line before.\n`,
    );
  } else {
    console.log(chalk.green('Compiled successfully.\n'));
  }

  console.log('File sizes after gzip:\n');
  printFileSizesAfterBuild(
    stats,
    previousFileSizes,
    dest,
    WARN_AFTER_BUNDLE_GZIP_SIZE,
    WARN_AFTER_CHUNK_GZIP_SIZE,
  );
}

updateStyles();
componentList.forEach((component) => {
  const componentPath = path.resolve(paths.appBuild, component);
  measureFileSizesBeforeBuild(componentPath)
    .then((previousFileSizes) => {
      fs.emptyDirSync(componentPath);
      return build(component, previousFileSizes);
    })
    .then(
      (results) => {
        if (results && results.stats) printResult(componentPath, results);
        else if (results && results.length) {
          results.forEach(result => printResult(componentPath, result));
        }
      },
      (errs) => {
        console.log(chalk.red('Failed to compile.\n'));
        if (errs !== null && errs.length) {
          errs.forEach(err => printBuildError(err));
        } else {
          printBuildError(errs);
        }
        process.exit(1);
      },
    );
});
measureFileSizesBeforeBuild(paths.appDoc)
  .then((previousFileSizes) => {
    fs.emptyDirSync(paths.appDoc);
    return build(null, previousFileSizes);
  })
  .then(
    (results) => {
      if (results && results.stats) printResult(null, results);
      else if (results && results.length) {
        results.forEach(result => printResult(null, result));
      }
    },
    (errs) => {
      console.log(chalk.red('Failed to compile.\n'));
      if (errs !== null && errs.length) {
        errs.forEach(err => printBuildError(err));
      } else {
        printBuildError(errs);
      }
      process.exit(1);
    },
  );
