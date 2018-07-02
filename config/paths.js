const path = require('path');
const fs = require('fs');
const url = require('url');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(pathStr, needsSlash) {
  const hasSlash = pathStr.endsWith('/');
  if (hasSlash && !needsSlash) {
    return pathStr.substr(pathStr, pathStr.length - 1);
  } if (!hasSlash && needsSlash) {
    return `${pathStr}/`;
  }
  return pathStr;
}

const getPublicUrl = appPackageJson => envPublicUrl || require.resolve(appPackageJson).homepage;

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

module.exports = {
  appDoc: resolveApp('docs'),
  appBuild: resolveApp('dist'),
  appBuildIndexJs: resolveApp('lib/index.js'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appLib: resolveApp('lib'),
  appNodeModules: resolveApp('node_modules'),
  appPackageJson: resolveApp('package.json'),
  appPublic: resolveApp('public'),
  appSrc: resolveApp('src'),
  dotenv: resolveApp('.env'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  testsSetup: resolveApp('lib/setupTests.js'),
  yarnLockFile: resolveApp('yarn.lock'),
};
