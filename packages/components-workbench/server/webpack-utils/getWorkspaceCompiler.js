import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const HOT_MIDDLEWARE = `webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true`;

export default ({ publicPath, entry, providedConfig }) => {
  const entryArray = [HOT_MIDDLEWARE];

  if (Array.isArray(entry)) {
    entryArray.concat(entry);
  } else if (typeof entry === "string") {
    entryArray.push(entry);
  } else {
    throw new TypeError(
      `Entry type mismatch in config for ${publicPath}. Named entries are not yet supported. Recieved ${entry}`
    );
  }

  const webpackConfig = {
    ...providedConfig,
    mode: "development",
    // entry: absoluteFilePath,
    entry: entryArray,
    output: {
      filename: "[name].bundle.js",
      publicPath,
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };

  return webpack(webpackConfig);
};
