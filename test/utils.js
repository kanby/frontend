import { beforeEach, afterEach } from 'mocha';
import React from 'react';
import sinon from 'sinon';
import styletronReact from 'styletron-react';

export const stubStyletron = () => {
  beforeEach(() => sinon.stub(styletronReact, 'styled', C => C));
  afterEach(() => styletronReact.styled.restore());
};

export const createMockComponent = name => {
  const Component = ({ children }) => <div className={name}>{children}</div>;

  Component.displayName = name;

  return Component;
};
