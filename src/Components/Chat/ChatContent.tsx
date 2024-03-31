import { useEffect, useRef, useState } from 'react';
import ChatItems from '../mini-component/ChatItem';
import styles from './ChatContent.module.css';
import { InfoCircleFilled, SendOutlined } from '@ant-design/icons';
function ChatContent(props) {
  const chatItems = props.messages;
  const currentUser = props.user;
  const selectedRoom = props.selectedRoom;

  // get room to have default title
  const defaultTitle = props.defaultTitleRoom;
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState('');

  // Function to scroll chat container to the bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatItems]);

  const handleTypingMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    setMessage('');
    props.onTypedMessage(message);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setMessage('');
      props.onTypedMessage(message);
    }
  };

  return (
    <>
      {selectedRoom ? (
        <>
          <div className={styles.main__chatcontent}>
            <div className={styles.content__header}>
              <div className={styles.blocks}>
                <div className={styles.current_chatting_user}>
                  <div className={styles.avatar}>
                    <div className='avatar_img'>
                      <img
                        src={
                          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU'
                        }
                        alt='#'
                      />
                    </div>
                    <span className={`isOnline`}></span>
                  </div>
                  <p>{props.title ? props.title : defaultTitle}</p>
                </div>
              </div>

              <div className={styles.blocks}>
                <div className={styles.settings}>
                  <button className={styles.btn_nobg}>
                    <InfoCircleFilled />
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.content__body} ref={chatContainerRef}>
              <div className={styles.chat__items}>
                {chatItems.map((itm, index) => {
                  return (
                    <ChatItems
                      key={itm.id}
                      user={itm.sender.id === currentUser ? 'me' : 'other'}
                      msg={itm.text}
                      image={itm.avatar}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.content__footer}>
              <div className={styles.sendNewMessage}>
                <input
                  type='text'
                  placeholder='Type a message here'
                  onChange={(e) => handleTypingMessage(e)}
                  onKeyPress={(e) => handleKeyPress(e)}
                  value={message}
                />
                <button
                  className={styles.btnSendMsg}
                  id='sendMsgBtn'
                  onClick={sendMessage}
                >
                  <SendOutlined />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default ChatContent;
