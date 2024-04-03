import React, { useState } from 'react';
import styles from './ChangePassword.module.css';
import { changePassword } from '../../api/connection';
import { ErrorMessage, SuccessMessage } from '../../utils/notify';
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

  const session = localStorage.getItem('jwtToken');
  const handleChange = () => {
    changePassword(passwordData, session)
      .then((res) => {
        setPasswordData({
          current_password: '',
          new_password: '',
          re_password: '',
        });
        SuccessMessage(res.data.message);
      })
      .catch((err) => {
        ErrorMessage(err.response.data.message);
      });
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
            value={passwordData.current_password}
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
            value={passwordData.new_password}
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
            value={passwordData.re_password}
            onChange={(e) => handleChangePassword(e, 're_password')}
            required
          />
          <br />

          <button className={styles.change} onClick={handleChange}>
            Change Password
          </button>
          <br />
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
