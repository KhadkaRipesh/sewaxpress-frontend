import { BACKEND_URL } from '../../constants/constants';
import { Icon } from '../common/Icon';
import styles from './CartItem.module.css';
function CartItem(props: any) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img
                src={`${BACKEND_URL}` + props.image}
                alt=''
                height={60}
                width={60}
              />
            </div>
          </div>
          <div className={styles.center}>
            <div className={styles.content}>
              <h4>{props.service}</h4>
              <p>Rs: {props.price}</p>
            </div>
          </div>
          <div className={styles.right}>
            <Icon
              icon='delete'
              size={26}
              onClick={props.onDelete}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
