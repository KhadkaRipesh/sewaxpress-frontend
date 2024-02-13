import { FaMailBulk, FaPhoneAlt } from 'react-icons/fa';
import logo from '../../assets/icon/icon.png';
import styles from './Footer.module.css';
function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.row}>
          <div className='col'>
            <h1>About Us</h1>
            <p>
              <a href='#'>About sewaxpress</a>
            </p>
          </div>
          <div className='col'>
            <h1>Locations</h1>
            <p>Kathmandu</p>
            <p>Lalitpur</p>
            <p>Bhaktapur</p>
          </div>
          <div className='col'>
            <h1>Contact Us</h1>
            <ul className={styles.contact}>
              <li className={styles.contact}>
                <div className={styles.icon}>
                  <FaMailBulk />
                </div>
                <p>
                  <a
                    href='mailto:sewaxpress.official@gmail.com'
                    target='_blank'
                  >
                    sewaxpress.official@gmail.com
                  </a>
                </p>
              </li>
              <li className={styles.contact}>
                <div className={styles.icon}>
                  <FaPhoneAlt />
                </div>
                <p>
                  <a href='#'>+977 9812333345</a>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <hr className={styles.line} />
        <div className={styles.subfooter}>
          <div className={styles.row}>
            <img src={logo} alt='' />
            <p>&copy; Copyright 2024 All Rights Reserved By Sewaxpress</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
