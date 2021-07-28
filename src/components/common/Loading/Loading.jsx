import React from 'react';
import styles from './styles.module.css';

const Loading = () => (
  <div className={styles.loading}>
    <div className={styles.ldsHourglass} />
    <div>Loading ...</div>
  </div>
);

export default Loading;
