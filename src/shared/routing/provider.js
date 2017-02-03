/* @flow */

import React from 'react';
import Route from 'route-parser';

type RoutingProviderProps = {
  children: React$Element<any>,
  routingProps: {
    Route: Route,
    url: string,
    params: Object,
  },
};

const RoutingProvider = ({ routingProps, children }: RoutingProviderProps) =>
  children;

RoutingProvider.childContextTypes = {
  routing: {
    Route: React.PropTypes.instanceOf(Route),
    url: React.PropTypes.string,
    params: React.PropTypes.object,
  },
};

RoutingProvider.getChildContext = ({ routingProps }) => {
  routing:
  routingProps;
};

export default RoutingProvider;
