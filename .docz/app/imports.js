export const imports = {
  'lib/button/Button.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "lib-button-button" */ 'lib/button/Button.mdx'),
}
