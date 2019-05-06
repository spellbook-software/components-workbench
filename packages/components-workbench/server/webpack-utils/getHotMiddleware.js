import webpackHotMiddleware from "webpack-hot-middleware";

export default (compiler, config = {}) => {
  // compiler.plugin("done", stats => {
  //   console.log(stats);
  // });
  return webpackHotMiddleware(compiler, {
    path: `/__webpack_hmr`,
    ...config,
  });
};
