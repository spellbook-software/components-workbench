import path from "path";
import express from "express";
// import wrapperWebpackConfig from "../wrapper/webpack.config";

import createWorkspacesWatcher from "./createWorkspacesWatcher";
import getWorkspaceRoute from "./routing-utils/getWorkspaceRoute";
import getWorkspaceCompiler from "./webpack-utils/getWorkspaceCompiler";
import getDevMiddleware from "./webpack-utils/getDevMiddleware";
import getHotMiddleware from "./webpack-utils/getHotMiddleware";

// routing
import getRouter, { addRoute, removeRoute } from "./routes/dynamicRouter";
// import rootRoute from "./routes/root";
// import statsRoute from "./routes/stats";

const PORT = 3000;

export default ({ executionDirectory, workspacesWebpackConfig }) => {
  const workspaces = {};

  const app = express();
  // app.use("/__routes", (req, res) => {
  //   res.send(JSON.stringify(router.stack, 4));
  // });
  // app.use("/", rootRoute);
  // app.use("/workbench_stats", statsRoute);

  app.use((request, response, next) => {
    const dynamicRouter = getRouter();
    dynamicRouter(request, response, next);
  });

  // creates chokidar watcher
  createWorkspacesWatcher({
    executionDirectory,
    // attaching individual dev servers
    onAdd: relativeFilePath => {
      const route = getWorkspaceRoute(relativeFilePath);
      const absoluteFilePath = path.resolve(
        executionDirectory,
        relativeFilePath
      );
      const compiler = getWorkspaceCompiler({
        publicPath: route,
        entry: absoluteFilePath,
        providedConfig: workspacesWebpackConfig,
      });
      const devMiddleware = getDevMiddleware(compiler);
      const hotMiddleware = getHotMiddleware(compiler);
      addRoute({ route, middlewares: [devMiddleware, hotMiddleware] });
      workspaces[route] = { route, relativeFilePath, absoluteFilePath };
      console.log(`Added http://localhost:3000${route}`);
    },
    onRemove: relativeFilePath => {
      const route = getWorkspaceRoute(relativeFilePath);
      removeRoute(route);
      delete workspaces[route];
    },
  });

  app.listen(PORT, () => console.log(`Workbench is listening on port ${PORT}`));
};
