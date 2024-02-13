import { FaGoogle } from 'react-icons/fa';
import styles from './AuthForm.module.css';

import React from 'react';

type AuthFormProps = {
  mode: string;
  toggleMode: () => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ mode, toggleMode }) => {
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
              name='name'
              id='name'
              placeholder='Enter your full name'
              required
            />
            <br />

            <label>Phone Number</label>
            <br />
            <input
              type='text'
              name='phone'
              id='phone'
              placeholder='Enter your phone number'
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
              required
            />
            <br />

            <button className={styles.signup}>Register</button>
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
              required
            />
            <br />

            <label>Password</label>
            <br />
            <input
              type='password'
              name='password'
              id='email'
              placeholder='Type your password'
              required
            />
            <br />
            <div className={styles.forgot}>
              <label>Forgot password?</label>
            </div>
            <br />

            <button className={styles.login}>Login</button>
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
