import Inferno from 'inferno';

import { Container, Row, Col } from 'components/grid';
import styles from './styles.css';

const Navbar = () => (
  <nav className={styles.wrapper}>
    <Container>
      <Row>
        <Col>
          <ul className={styles.menu}>
            <li><a href="/">Home</a></li>
            <li><a href="/boards">Boards</a></li>
          </ul>
        </Col>
      </Row>
    </Container>
  </nav>
);

export default Navbar;
