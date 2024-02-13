import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
import logo from '../../assets/icon/icon.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { Modal } from 'antd';
import Login from '../../Components/Auth/Login';
import Register from '../../Components/Auth/Register';
function Nav() {
  const [click, setClick] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  // This is for navigation toggle
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleCancel = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(false);
  };

  return (
    <>
      {isRegisterModalOpen && (
        <Modal
          title='Create An Account'
          visible={isRegisterModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Register />
        </Modal>
      )}

      {isLoginModalOpen && (
        <Modal
          title='Login to your Account'
          visible={isLoginModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Login />
        </Modal>
      )}
      <div className={styles.navbar}>
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
              <button onClick={closeMobileMenu}>Become Service Provider</button>
            </li>
            <li className={styles.login}>
              <button
                onClick={() => {
                  closeMobileMenu(), setLoginModalOpen(true);
                }}
              >
                Login
              </button>
            </li>
            <li className={styles.register}>
              <button
                onClick={() => {
                  closeMobileMenu(), setRegisterModalOpen(true);
                }}
              >
                Register
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Nav;
