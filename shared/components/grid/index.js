import Inferno from 'inferno';
import styles from './styles.css';

const Container = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);

const Row = ({ children }) => (
  <div className={styles.row}>
    {children}
  </div>
);

const Col = ({ children }) => (
  <div classNamed={styles.col}>
    {children}
  </div>
);

export { Col, Container, Row };
