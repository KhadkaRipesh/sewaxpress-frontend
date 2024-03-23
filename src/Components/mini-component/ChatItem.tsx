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
            <img
              src={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU'
              }
              alt='#'
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatItems;
