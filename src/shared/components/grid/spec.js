import Inferno from 'inferno';
import { expect } from 'chai';
import { render, selector } from 'test/utils';
import { Col, Container, Row } from './index';
import styles from './styles.css';

describe('grid/container', () => {
  it('renders children', () => {
    const $ = render(<Container>Hello, world!</Container>);
    expect($.text()).to.equal('Hello, world!');
  });

  it('is fluid by default', () => {
    const $ = render(<Container>Hello, world!</Container>);
    expect($(selector(styles.container)).attr('class')).to.contain(styles.fluid);
  });
});

describe('grid/col', () => {
  it('renders children', () => {
    const $ = render(<Col>Hello, world!</Col>);
    expect($.text()).to.equal('Hello, world!');
  });
});

describe('grid/row', () => {
  it('renders children', () => {
    const $ = render(<Row>Hello, world!</Row>);
    expect($.text()).to.equal('Hello, world!');
  });
});
