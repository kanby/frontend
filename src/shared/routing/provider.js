/* @flow */

import React from 'react';
import Route from 'route-parser';

class RoutingProvider extends React.Component {
  static childContextTypes = {
    routing: React.PropTypes.shape({
      Route: React.PropTypes.instanceOf(Route),
      url: React.PropTypes.string,
      params: React.PropTypes.object,
    }),
  };
  getChildContext = () => ({
    routing: this.props.routing,
  });
  render() {
    return this.props.children;
  }
}

export default RoutingProvider;
