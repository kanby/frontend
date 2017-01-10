import Inferno from 'inferno';
import { expect } from 'chai';
import { render } from 'test/utils';
import { Col, Container, Row } from './index';
import styles from './styles.css';

describe('grid/container', () => {
  it('renders children', () => {
    const tree = render(<Container>Hello, world!</Container>);
    expect(tree.text()).to.equal('Hello, world!');
  });

  it('is fluid by default', () => {
    const tree = render(<Container>Hello, world!</Container>);
    expect(tree.attr('class')).to.contain(styles.fluid);
  });
});

describe('grid/col', () => {
  it('renders children', () => {
    const tree = render(<Col>Hello, world!</Col>);
    expect(tree.text()).to.equal('Hello, world!');
  });
});

describe('grid/row', () => {
  it('renders children', () => {
    const tree = render(<Row>Hello, world!</Row>);
    expect(tree.text()).to.equal('Hello, world!');
  });
});
