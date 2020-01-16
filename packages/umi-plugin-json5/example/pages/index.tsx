import React from 'react';
import styles from './index.css';
import data from './test.json5';

export default function() {
  console.log(data);
  return (
    <div className={styles.normal}>
      <h1>Page index</h1>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
