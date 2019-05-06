import path from "path";

export default filePath => {
  const normalizedPathArray = path
    .normalize(filePath)
    .split(path.sep)
    .map(text => text.toLowerCase())
    .slice(0, -1);
  return `/${normalizedPathArray.join("/")}/`;
};
