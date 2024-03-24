import { BACKEND_URL } from '../../constants/constants';
import styles from '../Chat/ChatContent.module.css';
function ChatItems(props) {
  return (
    <>
      <div
        style={{ animationDelay: `0.8s` }}
        className={`${styles.chat__item} ${
          props.user === 'other' ? styles.other : ''
        }`}
      >
        <div className={styles.chat__item__content}>
          <div className={styles.chat__msg}>{props.msg}</div>
          <div className={styles.chat__meta}>
            <span>16 mins ago</span>
            <span>Seen 1.03PM</span>
          </div>
        </div>
        <div className={styles.avatar}>
          <div className={styles.avatar_img}>
            <img src={`${BACKEND_URL}` + props.image} alt='#' />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatItems;
