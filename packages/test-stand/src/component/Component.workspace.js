import React from "react";
import { render } from "react-dom";
import Component from "./Component";

if (!document.querySelector("#root")) {
  const root = document.createElement("div");
  root.id = "root";
  document.body.append(root);
}

render(<Component />, document.querySelector("#root"));

if (module.hot) {
  module.hot.accept();
}
