import { BACKEND_URL } from '../../constants/constants';
import styles from '../Chat/ChatList.module.css';
function ChatListItems(props: any) {
  return (
    <>
      <div
        style={{ animationDelay: `0.${props.animationDelay}s` }}
        onClick={props.onGetRoom}
        className={`${styles.chatlist__item} ${
          props.active === 'active' ? styles.active : ''
        } `}
      >
        <div className={styles.avatar}>
          <div className={styles.avatar_img}>
            {props.image ? (
              <img src={`${BACKEND_URL}` + props.image} alt='#' />
            ) : (
              <img src={''} alt='#' />
            )}
          </div>
          <span
            className={`${styles.isOnline} ${
              props.isOnline === 'active' ? styles.active : ''
            }`}
          ></span>
        </div>

        <div className={styles.userMeta}>
          <p>{props.name}</p>
          <span className={styles.activeTime}>32 mins ago</span>
        </div>
      </div>
    </>
  );
}

export default ChatListItems;
