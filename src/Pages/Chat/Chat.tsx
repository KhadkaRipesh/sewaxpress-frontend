import ChatContent from '../../Components/Chat/ChatContent';
import ChatList from '../../Components/Chat/ChatList';
import styles from './Chat.module.css';
function Chat() {
  return (
    <>
      <div className='container'>
        <div className={styles.main__chatbody}>
          <ChatList />
          <ChatContent />
        </div>
      </div>
    </>
  );
}

export default Chat;
