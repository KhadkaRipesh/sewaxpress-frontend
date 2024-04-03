import React, { useState } from 'react';
import styles from './ChangePassword.module.css';
function ChangePassword() {
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    re_password: '',
  });

  const handleChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setPasswordData({ ...passwordData, [field]: event.target.value });
  };

  return (
    <>
      <div className={styles.set_password}>
        <div className={styles.set_password_form}>
          <h2 className={styles.set_password_h2}>Change your Password</h2>
          <p className={styles.sub_head}>
            {' '}
            Note: Your new password must be 8-character.
          </p>
          <label>Current Password</label>
          <br />
          <input
            type='password'
            name='current_password'
            id='current_password'
            placeholder='Type your password'
            onChange={(e) => handleChangePassword(e, 'current_password')}
            required
          />
          <br />

          <label>New Password</label>
          <br />
          <input
            type='password'
            name='new_password'
            id='new_password'
            placeholder='Create new password'
            onChange={(e) => handleChangePassword(e, 'new_password')}
            required
          />
          <br />

          <label>Confirm Password</label>
          <br />
          <input
            type='password'
            name='re_password'
            id='re_password'
            placeholder='Confirm your password'
            onChange={(e) => handleChangePassword(e, 're_password')}
            required
          />
          <br />

          <button className={styles.change}>Change Password</button>
          <br />
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
