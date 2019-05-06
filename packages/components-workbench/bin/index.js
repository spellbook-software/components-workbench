#!/usr/bin / env node
const path = require("path");
const pkg = require("../package.json");

const pathSeparator = path.sep === "\\" ? "\\\\" : path.sep;
const packageScopeDirectory = `(${pkg["npm-namespace"]}|${
  pkg["workspace-prefix"]
})`;
const packageDirectory = pkg["raw-package-name"];

const packageDirectoryRegExp = `${packageScopeDirectory}${pathSeparator}${packageDirectory}`;
const babelTranspiled = new RegExp(packageDirectoryRegExp);

require("@babel/register")({
  // see https://github.com/babel/babel/issues/7701#issuecomment-389720069
  cwd: path.resolve(__dirname, ".."),
  only: [babelTranspiled],
});
require("./cli");
