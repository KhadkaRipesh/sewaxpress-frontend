import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
import logo from '../../assets/icon/icon.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
function Nav() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <>
      <div className={click ? styles.container_active : styles.container}>
        <div className={styles.rows}>
          <div className={styles.icon}>
            <NavLink to={'/'} onClick={closeMobileMenu}>
              <img className={styles.logo} src={logo} alt='logo' />
            </NavLink>
          </div>
          <div className={styles.menuIcon} onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
          <ul className={click ? styles.navMenu_active : styles.navMenu}>
            <li className={styles.serviceProvider}>
              <NavLink to={'/reg-service-provider'} onClick={closeMobileMenu}>
                Become Service Provider
              </NavLink>
            </li>
            <li className={styles.login}>
              <NavLink to={'/login'} onClick={closeMobileMenu}>
                Login
              </NavLink>
            </li>
            <li className={styles.register}>
              <NavLink to={'/login'} onClick={closeMobileMenu}>
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Nav;
