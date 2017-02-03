import Route from 'route-parser';

/*
    Route definitions are as simple as mapping a path to a component tree.
    Through the usage of declarative data requirements, we can deduce what
    data is required both on the client and server.
*/

const route = (path, component) => {
  return { path, component, Route: new Route(path) };
};

/*
  Match simply takes routes and a request URL and returns an object:
    {
      route: object: { path, component, Route } -- matched route
      path: string -- original path
      params: object -- resolved route params (if any)
    }
*/

const match = (routes, path) => {
  let params;
  const matched = routes.find(route => params = route.Route.match(path));

  if (matched) {
    return { route: matched, path, params };
  }

  return null;
};

const getRoutingProps = matched => {
  const { route, url, params } = matched;

  return {
    Route: route.Route,
    url,
    params,
  };
};

export { match, route };
