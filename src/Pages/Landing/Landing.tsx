import styles from './Landing.module.css';
import image from '../../assets/images/ru-service-provider.png';
function LandingPage() {
  return (
    <>
      <div className={'container'}>
        <div className={styles.section}>
          <div className={styles.image}>
            <img src={image} alt='service providers' width={400} />
          </div>
          <div className={styles.content_box}>
            <span className={styles.company}>SewaXpress</span>
            <h1 className={styles.slogan}>Quality home services, on demand</h1>
            <p className={styles.sub_slogan}>
              Hami kaha sabai sewa uplabdha xa
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
