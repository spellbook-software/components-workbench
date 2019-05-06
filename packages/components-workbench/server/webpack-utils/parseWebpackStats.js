import path from "path";

// const getTimestamp = () => parseInt(`${new Date().getTime() / 1000}`, 10);

export default stats => {
  const { outputPath, time, assets } = stats;
  // const now = getTimestamp();
  const parsedAssets = assets.map(asset => {
    const { size, name, chunkNames } = asset;
    // this.gzipSize === false
    //   ? asset.size
    //   : await gzipSize.file(path.join(outputPath, asset.name));
    return {
      name: path.extname(name),
      chunk: chunkNames[0],
      size,
      type: path.extname(asset.name).substring(1),
    };
  });
  return {
    outputPath,
    time,
    assets: parsedAssets,
  };
};
