import Inferno from 'inferno';
import { Link } from 'inferno-router';
import styles from './styles.css';

const Navbar = () => (
  <nav className={styles.wrapper}>
    <span className={styles.logo}>Kanby</span>
    <ul className={styles.menu}>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/boards">Boards</Link></li>
    </ul>
  </nav>
);

export default Navbar;
