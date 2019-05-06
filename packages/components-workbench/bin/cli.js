/* eslint-disable unicorn/no-process-exit */
/* eslint-disable global-require */
import fs from "fs";
import program from "commander";
import path from "path";
import pkg from "../package.json";
import startServer from "../server";

program
  .command("start")
  .description("start dev server")
  .option("-C --config <configFile>", "Path to custom webpackConfig")
  .option("--no-default-config", "Don't use ./webpack.config.js by default")
  .action(options => {
    const executionDirectory = process.cwd();
    let workspacesWebpackConfig = null;
    if (options.config) {
      const workspacesWebpackConfigPath = path.resolve(
        executionDirectory,
        options.config
      );
      if (fs.existsSync(workspacesWebpackConfigPath)) {
        // eslint-disable-next-line import/no-dynamic-require
        workspacesWebpackConfig = require(workspacesWebpackConfigPath);
      }
    } else {
      const defaultConfigLocation = path.resolve(
        executionDirectory,
        "./webpack.config.js"
      );
      if (fs.existsSync(defaultConfigLocation)) {
        // eslint-disable-next-line import/no-dynamic-require
        workspacesWebpackConfig = require(defaultConfigLocation);
      }
    }
    startServer({ executionDirectory, workspacesWebpackConfig });
  });

program.command("*", { noHelp: true }).action(cmd => {
  console.error(
    "Invalid command: %s.\nSee --help for a list of available commands.",
    cmd
  );
  process.exit(1);
});

program.version(pkg.version).parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
