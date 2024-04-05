import { useState } from 'react';
import styles from './ProgressBar.module.css';

function ProgressBar() {
  const [circle, setCircle] = useState(4);
  return (
    <>
      <div className={styles.content}>
        <div className={styles.progressbar}></div>
        <button>Prev</button>
        <button>Next</button>
      </div>
    </>
  );
}

export default ProgressBar;
