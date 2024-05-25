import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from 'react';
import { BACKEND_URL } from '../../constants/constants';
import styles from '../Chat/ChatContent.module.css';
function ChatItems(props: {
  user: string;
  msg:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
  image: string;
}) {
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
            {/* <span>16 mins ago</span>
            <span>Seen 1.03PM</span> */}
          </div>
        </div>
        <div className={styles.avatar}>
          <div className={styles.avatar_img}>
            {props.image ? (
              <img src={`${BACKEND_URL}` + props.image} alt='#' />
            ) : (
              <img
                src={
                  'https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo='
                }
                alt='#'
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatItems;
