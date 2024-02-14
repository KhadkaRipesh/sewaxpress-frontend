import { useState } from 'react';
import styles from './AuthForm.module.css';
import axios from 'axios';
import { ErrorMessage, SuccessMessage } from '../../utils/notify';
import { useParams } from 'react-router-dom';
function SetPassword() {
  const { userId, otp } = useParams();
  const [password, setPassword] = useState({
    password: '',
    re_password: '',
  });

  const handleSetPassword = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setPassword({ ...password, [field]: event.target.value });
  };

  const createPassword = (event) => {
    event.preventDefault();

    axios
      .post(
        `http://192.168.100.225:8848/auth/${userId}/set-password/${otp}`,
        password
      )
      .then((response) => {
        SuccessMessage(response.data.message);
      })
      .catch((error) => ErrorMessage(error.response.data.message));
  };

  return (
    <>
      <div className='container'>
        <div className={styles.form}>
          <h2 className={styles.h2}>Create your Password</h2>
          <p className={styles.sub_head}>
            Your new password must be 8-character.
          </p>
          <label>Password</label>
          <br />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Type your password'
            onChange={(e) => handleSetPassword(e, 'password')}
            required
          />
          <br />

          <label>Password</label>
          <br />
          <input
            type='password'
            name='re_password'
            id='re_password'
            placeholder='Confirm your password'
            onChange={(e) => handleSetPassword(e, 're_password')}
            required
          />
          <br />
          <div className={styles.forgot}>
            <label>Forgot password?</label>
          </div>
          <br />

          <button className={styles.login} onClick={createPassword}>
            Create Password
          </button>
          <br />
        </div>
      </div>
    </>
  );
}

export default SetPassword;
