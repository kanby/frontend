import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Col, Container, Row } from './index';
import { shallow } from 'test/utils';

describe('grid/container', () => {
  it('renders children', () => {
    const tree = shallow(<Container>Hello, world!</Container>);
    expect(tree.text()).to.equal('Hello, world!');
  });
});

describe('grid/col', () => {
  it('renders children', () => {
    const tree = shallow(<Col>Hello, world!</Col>);
    expect(tree.text()).to.equal('Hello, world!');
  });
});

describe('grid/row', () => {
  it('renders children', () => {
    const tree = shallow(<Row>Hello, world!</Row>);
    expect(tree.text()).to.equal('Hello, world!');
  });
});
