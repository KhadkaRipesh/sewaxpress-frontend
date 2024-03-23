import ChatItems from '../mini-component/ChatItem';
import styles from './ChatContent.module.css';
import { InfoCircleFilled, SendOutlined } from '@ant-design/icons';
function ChatContent() {
  const chatItms = [
    {
      key: 1,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU',
      type: '',
      msg: 'Hi Tim, How are you?',
    },
    {
      key: 2,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
      type: 'other',
      msg: 'I am fine.',
    },
    {
      key: 3,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
      type: 'other',
      msg: 'What about you?',
    },
    {
      key: 4,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU',
      type: '',
      msg: 'Awesome these days.',
    },
    {
      key: 5,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
      type: 'other',
      msg: "Finally. What's the plan?",
    },
    {
      key: 6,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU',
      type: '',
      msg: 'what plan mate?',
    },
    {
      key: 7,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
      type: 'other',
      msg: "I'm taliking about the tutorial",
    },
  ];
  return (
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
              <p>Tim Hover</p>
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
        <div className={styles.content__body}>
          <div className={styles.chat__items}>
            {chatItms.map((itm, index) => {
              return (
                <ChatItems
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : 'me'}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.content__footer}>
          <div className={styles.sendNewMessage}>
            <input type='text' placeholder='Type a message here' />
            <button className={styles.btnSendMsg} id='sendMsgBtn'>
              <SendOutlined />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatContent;
