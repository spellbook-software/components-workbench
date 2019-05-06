import chokidar from "chokidar";

export default ({ executionDirectory, onAdd, onRemove }) => {
  const watcher = chokidar.watch(`**/*.workspace.js`, {
    cwd: executionDirectory,
    ignored: /node_modules/,
    persistent: true,
  });

  watcher
    .on("add", onAdd)
    .on("unlink", onRemove)
    .on("error", error => console.log(`Watcher error: ${error}`));

  return watcher;
};
