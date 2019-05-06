import express from "express";

// i feel that's
// eslint-disable-next-line import/no-mutable-exports
let router = express.Router();
export const routes = {};

export const addRoute = ({ route, middlewares }) => {
  if (!routes[route]) {
    routes[route] = { middlewares };
    middlewares.forEach(middleware => {
      router.use(route, middleware);
    });
  }
};

export const removeRoute = route => {
  if (routes[route]) {
    router = express.Router();
    const newRoutes = { ...routes };
    Object.keys(routes).forEach(key => {
      delete routes[key];
    });
    delete newRoutes[route];
    Object.keys(newRoutes).forEach(routeKey => {
      const routeDef = newRoutes[routeKey];
      addRoute({ route: routeKey, middlewares: routeDef.middlewares });
    });
  }
};

export default () => router;
