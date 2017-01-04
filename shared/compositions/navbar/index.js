import React from 'react';
import styles from './styles.css';

export default class Navigation extends React.Component {
  render() {
    return (
      <nav className={styles.wrapper}>
        <span className={styles.logo}>Kanby</span>
        <ul className={styles.menu}>
          <li><a href="/">Home</a></li>
        </ul>
      </nav>
    );
  }
}
