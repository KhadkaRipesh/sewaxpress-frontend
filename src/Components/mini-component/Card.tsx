import { Icon } from '../common/Icon';
import styles from './Card.module.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Card(props: any) {
  return (
    <>
      <div
        className={styles.ContainerSide}
        style={{ backgroundColor: props.color }}
      >
        {' '}
      </div>
      <div className={styles.Container} style={props.style}>
        <div className={styles.iconContainer}>
          <Icon icon={props.icon} className={styles.icon} />
        </div>
        <div className={styles.carditems}>
          <p className={styles.subtitle}>{props.subtitle}</p>
          <p className={styles.title}>{props.title}</p>
        </div>
      </div>
    </>
  );
}
