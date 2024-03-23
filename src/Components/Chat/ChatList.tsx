import ChatListItems from '../mini-component/ChatList';
import styles from './ChatList.module.css';
function ChatList(props) {
  const rooms = props.rooms;
  const user = props.user;
  return (
    <>
      <div className={styles.main__chatlist}>
        <div className={styles.chatlist__heading}>
          <h2>Chats</h2>
        </div>
        <div className={styles.chatList__search}>
          <div className={styles.search_wrap}>
            <input type='text' placeholder='Search Here' required />
            <button className={styles.search_btn}></button>
          </div>
        </div>
        <div className={styles.chatlist__items}>
          {rooms.map((item, index) => {
            const nameToDisplay =
              user === 'CUSTOMER' ? item.hub_name : item.customer_full_name;

            return (
              <ChatListItems
                name={nameToDisplay}
                key={item.room_id}
                animationDelay={index + 1}
                active={item.active ? 'active' : ''}
                isOnline={item.isOnline ? 'active' : ''}
                image={item.hub_avatar}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ChatList;
