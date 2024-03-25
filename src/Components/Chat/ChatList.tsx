import ChatListItems from '../mini-component/ChatList';
import styles from './ChatList.module.css';
function ChatList(props) {
  const rooms = props.rooms;
  const user = props.user;
  const selectedRoom = props.defaultSelectedRoom;

  const getCurrentRoom = (e, room: string, nameToDisplay: string) => {
    props.onRoomSelect(room);
    props.onTitleName(nameToDisplay);
    const chatItems = e.currentTarget.parentNode.children;

    for (let index = 0; index < chatItems.length; index++) {
      chatItems[index].classList.remove(`${styles.active}`);
    }

    e.currentTarget.classList.add(`${styles.active}`);
  };
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
                active={selectedRoom === item.room_id ? 'active' : ''}
                isOnline={item.isOnline ? 'active' : ''}
                image={item.hub_avatar}
                onGetRoom={(e) =>
                  getCurrentRoom(e, item.room_id, nameToDisplay)
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ChatList;
