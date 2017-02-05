import React from 'react';
import sinon from 'sinon';
import Styletron from 'styletron-server';
import { shallow as enzymeShallow } from 'enzyme';

export const optsWithStyletronContext = (opts = {}) => ({
  ...opts,
  context: {
    styletron: new Styletron(),
    ...opts.context,
  },
});

export const shallow = (tree, opts = {}) =>
  enzymeShallow(tree, optsWithStyletronContext(opts));

export const createMockComponent = name => {
  const Component = ({ children }) => <div className={name}>{children}</div>;

  Component.displayName = name;

  return Component;
};
