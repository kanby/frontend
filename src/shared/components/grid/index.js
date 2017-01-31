/* @flow */

import Inferno from 'inferno';
import classnames from 'classnames';
import styles from './styles.css';

type ContainerProps = {
  children: any,
  className: string,
  fluid: boolean,
};

const Container = ({ children, className, fluid = true }: ContainerProps) => (
  <div className={classnames(styles.container, className, {
      [styles.fluid]: fluid,
    })}>
    {children}
  </div>
);

const Row = ({ children }: { children: any }) => (
  <div className={styles.row}>
    {children}
  </div>
);

const Col = ({ children }: { children: any }) => (
  <div className={styles.col}>
    {children}
  </div>
);

export { Col, Container, Row };
