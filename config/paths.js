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
  } else if (!hasSlash && needsSlash) {
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
  appBuild: resolveApp('build'),
  appBuildIndexJs: resolveApp('src/index.js'),
  appBuildSrc: resolveApp('src'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('demo/index.js'),
  appNodeModules: resolveApp('node_modules'),
  appPackageJson: resolveApp('package.json'),
  appPublic: resolveApp('public'),
  appSrc: resolveApp('demo'),
  dotenv: resolveApp('.env'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  testsSetup: resolveApp('src/setupTests.js'),
  yarnLockFile: resolveApp('yarn.lock'),
};
