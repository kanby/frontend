import React from 'react';

import { Link } from 'react-router';
import { Container, Row, Col } from 'components/grid';
// import styles from './styles.css';
import { styled } from 'styletron-react';
import { colors, spacing } from 'shared/styles';

const List = styled('ul', {
  listStyleType: 'none',
  marginBottom: 0,
  marginTop: 0,
  padding: 0,
});

const Nav = styled('nav', {
  backgroundColor: colors.slate,
  ...spacing.paddingVertical(),
});

const Navbar = () => (
  <Nav>
    <Container>
      <Row>
        <Col>
          <List>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/boards">Boards</Link></li>
          </List>
        </Col>
      </Row>
    </Container>
  </Nav>
);

export default Navbar;
