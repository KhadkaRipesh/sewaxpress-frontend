import { FaGoogle } from 'react-icons/fa';
import styles from './AuthForm.module.css';

import React, { useState } from 'react';
import axios from 'axios';
import { ErrorMessage, SuccessMessage } from '../../utils/notify';
import { isEmptyObject } from '../../constants';
import { useLocation, useNavigate } from 'react-router-dom';

type AuthFormProps = {
  mode: string;
  toggleMode: () => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ mode, toggleMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  sessionStorage.setItem('redirectUrl', location.pathname);
  // states
  const [registerData, setRegisterData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleRegisterData = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setRegisterData({ ...registerData, [field]: event.target.value });
  };

  const handleLoginData = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setLoginData({ ...loginData, [field]: event.target.value });
  };

  const register = (event) => {
    event.preventDefault;

    if (isEmptyObject(registerData)) {
      {
        ErrorMessage('Fields cannot be empty.');
      }
    } else {
      // hit api through axios
      axios
        .post('http://192.168.100.225:8848/auth/register', registerData)
        .then((response) => {
          SuccessMessage(response.data.message);
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

  const login = (event) => {
    event.preventDefault;

    if (isEmptyObject(loginData)) {
      {
        ErrorMessage('Fields cannot be empty.');
      }
    } else {
      // hit api through axios
      axios
        .post('http://192.168.100.225:8848/auth/login', loginData)
        .then((response) => {
          SuccessMessage(response.data.message);
          const token = response.data.data.access_token;
          sessionStorage.setItem('jwtToken', token);
          const redirectUrl = sessionStorage.getItem('redirectUrl');
          if (redirectUrl) {
            console.log(redirectUrl);
            navigate(redirectUrl);
            // Clear the stored URL after redirection
            sessionStorage.removeItem('redirectUrl');
          } else {
            // If there is no stored URL, redirect to a default page
            navigate('/');
          }
          window.location.reload();
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
      {/* Registration fields */}
      {mode === 'register' && (
        <>
          <div className={styles.form}>
            <h2 className={styles.h2}>Create an Account</h2>
            <button className={styles.google} type='submit'>
              <div className={styles.icon}>
                <FaGoogle size={17} />
              </div>
              <div className={styles.google_signup}>Sign up with Google</div>
            </button>
            <p className={styles.hr_lines}> Sign up with email </p>

            <label>Full Name</label>
            <br />
            <input
              type='text'
              name='full_name'
              id='full_name'
              placeholder='Enter your full name'
              onChange={(e) => handleRegisterData(e, 'full_name')}
              required
            />
            <br />

            <label>Phone Number</label>
            <br />
            <input
              type='text'
              name='phone_number'
              id='phone_number'
              placeholder='Enter your phone number'
              onChange={(e) => handleRegisterData(e, 'phone_number')}
              required
            />
            <br />

            <label>Email Address:</label>
            <br />
            <input
              type='text'
              name='email'
              id='email'
              placeholder='Enter your email'
              onChange={(e) => handleRegisterData(e, 'email')}
              required
            />
            <br />

            <button className={styles.signup} onClick={register}>
              Register
            </button>
            <br />
            <span className={styles.signin}>
              Already have an account?{' '}
              <button onClick={toggleMode}>Sign In</button>
            </span>
          </div>
        </>
      )}

      {/* Login fields */}
      {mode === 'login' && (
        <>
          <div className={styles.form}>
            <h2 className={styles.h2}>Login to your Account</h2>
            <button className={styles.google}>
              <div className={styles.icon}>
                <FaGoogle size={17} />
              </div>
              <div className={styles.google_signup}>Sign in with Google</div>
            </button>
            <p className={styles.hr_lines}> Sign in with email </p>
            <label>Email Address</label>
            <br />
            <input
              type='text'
              name='email'
              id='email'
              placeholder='Enter your email'
              onChange={(e) => handleLoginData(e, 'email')}
              required
            />
            <br />

            <label>Password</label>
            <br />
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Type your password'
              onChange={(e) => handleLoginData(e, 'password')}
              required
            />
            <br />
            <div className={styles.forgot}>
              <label>Forgot password?</label>
            </div>
            <br />

            <button className={styles.login} onClick={login}>
              Login
            </button>
            <br />
            <span className={styles.register}>
              Don't have an account?
              <button onClick={toggleMode}>Register here</button>
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default AuthForm;
