import styles from '../Chat/ChatList.module.css';
function ChatListItems(props: any) {
  const selectChat = (e) => {
    const chatItems = e.currentTarget.parentNode.children;

    for (let index = 0; index < chatItems.length; index++) {
      chatItems[index].classList.remove(`${styles.active}`);
    }

    e.currentTarget.classList.add(`${styles.active}`);
  };
  return (
    <>
      <div
        style={{ animationDelay: `0.${props.animationDelay}s` }}
        onClick={selectChat}
        className={`${styles.chatlist__item} ${
          props.active === 'active' ? styles.active : ''
        } `}
      >
        <div className={styles.avatar}>
          <div className={styles.avatar_img}>
            <img src={props.image} alt='#' />
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
