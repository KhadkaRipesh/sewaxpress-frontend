import { FaGoogle } from 'react-icons/fa';
import styles from './AuthForm.module.css';

import React, { useState } from 'react';
import axios from 'axios';
import { ErrorMessage, SuccessMessage } from '../../utils/notify';
import { isEmptyObject } from '../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../constants/constants';

type AuthFormProps = {
  mode: string;
  toggleMode: (mode: string) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ mode, toggleMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || '/';

  // localStorage.setItem('redirectUrl', location.pathname);
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

  const [emailData, setEmailData] = useState({
    email: '',
  });

  const handleForgotData = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEmailData({ ...emailData, [field]: event.target.value });
  };

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
        .post(`${BACKEND_URL}/auth/register`, registerData)
        .then((response) => {
          console.log(response.data);
          SuccessMessage('Check email to set password.');
          navigate('/');
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

  const login = (event) => {
    event.preventDefault;

    if (isEmptyObject(loginData)) {
      {
        ErrorMessage('Fields cannot be empty.');
      }
    } else {
      // hit api through axios
      axios
        .post(`${BACKEND_URL}/auth/login`, loginData)
        .then((response) => {
          SuccessMessage(response.data.message);
          const token = response.data.data.access_token;
          const role = response.data.data.role;
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('role', role);
          if (role === 'ADMIN') {
            navigate('/admin/dashboard');
          } else if (role === 'SERVICE_PROVIDER') {
            navigate('/serviceprovider/dashboard');
          } else {
            window.location.reload();
          }
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
  const resetPassword = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/auth/reset-request`, emailData)
      .then((response) => {
        console.log(response.data);
        SuccessMessage('Check email to set password.');
        navigate('/');
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
  };

  const handleSwitchToSignup = () => {
    toggleMode('register');
  };
  const handleSwitchToSignIn = () => {
    toggleMode('login');
  };
  const handleForgotPassword = () => {
    toggleMode('reset');
  };

  return (
    <>
      {/* Registration fields */}
      {mode === 'register' && (
        <>
          <div className={styles.form}>
            <h2 className={styles.h2}>Create an Account</h2>
            <a href='http://localhost:8848/auth/google/callback'>
              <button className={styles.google} type='submit'>
                <div className={styles.icon}>
                  <FaGoogle size={17} />
                </div>
                <div className={styles.google_signup}>Sign up with Google</div>
              </button>
            </a>
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
              <button onClick={handleSwitchToSignIn}>Sign In</button>
            </span>
          </div>
        </>
      )}
      {/* Login fields */}
      {mode === 'login' && (
        <>
          <div className={styles.form}>
            <h2 className={styles.h2}>Login to your Account</h2>
            <a href='http://localhost:8848/auth/google/callback'>
              <button className={styles.google}>
                <div className={styles.icon}>
                  <FaGoogle size={17} />
                </div>
                <div className={styles.google_signup}>Sign in with Google</div>
              </button>
            </a>
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
              <label onClick={handleForgotPassword}>Forgot password?</label>
            </div>
            <br />

            <button className={styles.login} onClick={login}>
              Login
            </button>
            <br />
            <span className={styles.register}>
              Don't have an account?
              <button onClick={handleSwitchToSignup}>Register here</button>
            </span>
          </div>
        </>
      )}

      {mode === 'reset' && (
        <>
          <div className={styles.form}>
            <h2 className={styles.h2}>Reset your Password</h2>
            <p className={styles.hr_lines}> Reset password with email </p>

            <label>Email</label>
            <br />
            <input
              type='text'
              name='email'
              id='email'
              placeholder='Enter your email'
              onChange={(e) => handleForgotData(e, 'email')}
              required
            />
            <br />
            <button className={styles.login} onClick={resetPassword}>
              Get Email
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AuthForm;
