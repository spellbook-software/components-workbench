import webpackDevMiddleware from "webpack-dev-middleware";

// {
//   reporter: (middlewareOptions, options) => {
//     const { log, state, stats } = options;
//     allStats[route] = stats;
//   },
//   }

export default (compiler, config = {}) => {
  // compiler.plugin("done", stats => {
  //   console.log(stats);
  // });
  return webpackDevMiddleware(compiler, config);
};
