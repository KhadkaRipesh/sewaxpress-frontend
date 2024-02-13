import React from 'react';
import styles from './popup.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          {children}
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
