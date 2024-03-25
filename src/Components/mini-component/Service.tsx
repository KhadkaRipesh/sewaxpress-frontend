import { Icon } from '../common/Icon';
import styles from './Service.module.css';
import chat from '../../assets/images/chat.jpg';
import { BACKEND_URL } from '../../constants/constants';

function ServiceCard(props: any) {
  return (
    <>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className='image'>
            <img
              src={`${BACKEND_URL}` + props.image}
              alt=''
              height={290}
              width={347}
            />
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.service_title}>
            <h2>{props.service}</h2>
          </div>
          <span className={styles.hub}>
            By:<i>{props.hub}</i>
            <div className={styles.location}>
              <Icon icon='location' size={16} />
              <span>{props.location}</span>
            </div>
          </span>
          <div className={styles.description}>
            <span>{props.description}</span>
          </div>

          <div className={styles.main}>
            <div className={styles.time}>
              <Icon icon='time' size={16} />
              <p className={styles.hour}>{props.time}</p>
            </div>
            <div className={styles.price}>Price: Rs.{props.price}</div>
            <div className={styles.action}>
              <Icon icon='cart' size={22} />
              <button className={styles.add} onClick={props.onAddToCart}>
                Add
              </button>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className='contact'>
            <img src={chat} alt='' height={200} width={200} />
            <button className={styles.chat} onClick={props.chatToHub}>
              Chat
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceCard;
