/* eslint-disable global-require */
let express;
// import router, { addRoute, removeRoute, routes } from './dynamicRouter';

describe("dynamicRouter", () => {
  beforeEach(() => {
    jest.resetModules();
    express = require("express");
  });
  describe("router", () => {
    it("should be an instance of express router", () => {
      const { default: getRouter } = require("./dynamicRouter");
      // a bit hard to test with that interface
      // all that matters is that it's an express router
      expect(JSON.stringify(getRouter())).toEqual(
        JSON.stringify(express.Router())
      );
    });
    it("initial stack should be empty", () => {
      const { default: getRouter } = require("./dynamicRouter");
      expect(getRouter().stack).toEqual([]);
    });
  });

  describe("addRoute", () => {
    it("should addRoute", () => {
      const { default: getRouter, addRoute } = require("./dynamicRouter");
      const exprectedStack = express.Router().use("/testroute", () => {}).stack;
      addRoute({ route: "/testroute", middlewares: [() => {}] });
      expect(getRouter().stack.length).toEqual(exprectedStack.length);
      expect(JSON.stringify(getRouter().stack)).toEqual(
        JSON.stringify(exprectedStack)
      );
    });
  });

  describe("removeRoute", () => {
    it("should replace router", () => {
      const {
        default: getRouter,
        routes,
        addRoute,
        removeRoute,
      } = require("./dynamicRouter");
      const router = getRouter();
      const exprectedStack = express.Router().use("/testroute2", () => {})
        .stack;
      addRoute({ route: "/testroute", middlewares: [() => {}] });
      addRoute({ route: "/testroute2", middlewares: [() => {}] });
      expect(Object.keys(routes)).toHaveLength(2);
      expect(getRouter().stack).toHaveLength(2);
      const oldRouter = getRouter();
      expect(router).toBe(oldRouter);
      removeRoute("/testroute");
      const newRouter = getRouter();
      expect(router).not.toBe(newRouter);
      expect(Object.keys(routes)).toHaveLength(1);
      expect(routes["/testroute2"]).toBeDefined();
      expect(getRouter().stack).toHaveLength(1);
      expect(JSON.stringify(getRouter().stack[0])).toEqual(
        JSON.stringify(exprectedStack[0])
      );
    });
  });
});
