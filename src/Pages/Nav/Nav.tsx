import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
import logo from '../../assets/icon/icon.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { Modal } from 'antd';
import AuthForm from '../../Components/Auth/AuthForm';
function Nav() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState('register');

  const handleCancel = () => {
    setModalOpen(false);
  };

  const toggleMode = (mode: string) => {
    setMode(mode);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          className='modalStyle'
        >
          <AuthForm mode={mode} toggleMode={toggleMode} />
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
                  closeMobileMenu(), setMode('login'), openModal();
                }}
              >
                Login
              </button>
            </li>
            <li className={styles.register}>
              <button
                onClick={() => {
                  closeMobileMenu(), setMode('register'), openModal();
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
