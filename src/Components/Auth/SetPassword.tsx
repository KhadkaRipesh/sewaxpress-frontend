import { useState } from 'react';
import styles from './AuthForm.module.css';
import axios from 'axios';
import { ErrorMessage, SuccessMessage } from '../../utils/notify';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmptyObject } from '../../constants';
import { BACKEND_URL } from '../../constants/constants';
function SetPassword() {
  const navigate = useNavigate();
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

  const createPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (isEmptyObject(password)) {
      {
        ErrorMessage('Fields cannot be empty.');
      }
    } else {
      axios
        .post(`${BACKEND_URL}/auth/${userId}/set-password/${otp}`, password)
        .then((response) => {
          SuccessMessage(response.data.message);
          navigate('/login');
        })
        .catch((error) => {
          if (error.response) {
            ErrorMessage(error.response.data.message);
          } else if (error.request) {
            ErrorMessage('Network Error.');
          } else {
            ErrorMessage('Something went wrong.');
          }
        });
    }
  };

  return (
    <>
      <div className={styles.set_password}>
        <div className={styles.set_password_form}>
          <h2 className={styles.set_password_h2}>Create your Password</h2>
          <p className={styles.sub_head}>
            Your new password must be 8-character.
          </p>
          <label>Password</label>
          <br />
          <input
            className={styles.textField}
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
            className={styles.textField}
            type='password'
            name='re_password'
            id='re_password'
            placeholder='Confirm your password'
            onChange={(e) => handleSetPassword(e, 're_password')}
            required
          />
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
