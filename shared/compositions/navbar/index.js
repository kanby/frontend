import Inferno from 'inferno';
import styles from './styles.css';

const Navbar = () => (
  <nav className={styles.wrapper}>
    <span className={styles.logo}>Kanby</span>
    <ul className={styles.menu}>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
);

export default Navbar;
