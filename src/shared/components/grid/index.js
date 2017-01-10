import Inferno from 'inferno';
import classnames from 'classnames';
import styles from './styles.css';

const Container = ({ children, className, fluid }) => (
  <div className={classnames(styles.container, className, { [styles.fluid]: fluid })}>
    {children}
  </div>
);

Container.defaultProps = {
  fluid: true,
};

const Row = ({ children }) => (
  <div className={styles.row}>
    {children}
  </div>
);

const Col = ({ children }) => (
  <div className={styles.col}>
    {children}
  </div>
);

export { Col, Container, Row };
