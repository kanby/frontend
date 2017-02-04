import React from 'react';

import { Link } from 'react-router';
import { Container, Row, Col } from 'components/grid';
import styles from './styles.css';

const Navbar = () => (
  <nav className={styles.wrapper}>
    <Container>
      <Row>
        <Col>
          <ul className={styles.menu}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/boards">Boards</Link></li>
          </ul>
        </Col>
      </Row>
    </Container>
  </nav>
);

export default Navbar;
