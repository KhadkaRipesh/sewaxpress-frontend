import { FaGoogle } from 'react-icons/fa';
import styles from './AuthForm.module.css';

import React, { useState } from 'react';
import axios from 'axios';
import { ErrorMessage, SuccessMessage } from '../../utils/notify';
import { isEmptyObject } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../constants/constants';
import { applicationForServiceProvider } from '../../api/connection';
import { Checkmark } from 'react-checkmark';

type AuthFormProps = {
  mode: string;
  toggleMode: (mode: string) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ mode, toggleMode }) => {
  const navigate = useNavigate();

  type FormData = {
    name: string;
    address: string;
    description: string;
    email: string;
    full_name: string;
    phone_number: string;
    password: string;
    [key: string]: string;
  };

  type DocumentData = {
    avatar: File | null;
    documents: File | null;
    citizenship_front: File | null;
    citizenship_back: File | null;
    [key: string]: File | null;
  };

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

  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    description: '',
    email: '',
    full_name: '',
    phone_number: '',
    password: '',
  });

  const [documents, setDocuments] = useState<DocumentData>({
    avatar: null,
    documents: null,
    citizenship_front: null,
    citizenship_back: null,
  });

  const handleFormDataChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = event.target.files && event.target.files[0];
    setDocuments({ ...documents, [field]: file });
  };

  const sendApplication = () => {
    // create Formdata object
    const formdataToSend = new FormData();

    for (const key in formData) {
      formdataToSend.append(key, formData[key]);
    }

    for (const key in documents) {
      const value = documents[key];
      if (value instanceof File) {
        formdataToSend.append(key, value);
      }
    }

    applicationForServiceProvider(formdataToSend)
      .then((res) => {
        console.log(res);
        SuccessMessage('Successfully Applied, We will contact you soon.');

        // clear all state values
        setFormData({
          name: '',
          address: '',
          description: '',
          email: '',
          full_name: '',
          phone_number: '',
          password: '',
        });
        setDocuments({
          avatar: null,
          documents: null,
          citizenship_front: null,
          citizenship_back: null,
        });
      })
      .catch((err) => {
        console.log(err.response);
        ErrorMessage('Enter valid credentials and try again.');
      });
  };

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

  const register = () => {
    if (isEmptyObject(registerData)) {
      {
        ErrorMessage('Fields cannot be empty.');
      }
    } else {
      // hit api through axios
      axios
        .post(`${BACKEND_URL}/auth/register`, registerData)
        .then(() => {
          SuccessMessage('Check email to set password.');
          navigate('/');
          // window.location.reload();
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

  const login = () => {
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
          console.log(role);
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
  const resetPassword = () => {
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
            <a href={`${BACKEND_URL}/auth/google/callback`}>
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
              className={styles.textField}
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
              className={styles.textField}
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
              className={styles.textField}
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
            <a href={`${BACKEND_URL}/auth/google/callback`}>
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
              className={styles.textField}
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
              className={styles.textField}
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
              className={styles.textField}
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

      {mode === 'serviceprovidermode' && (
        <>
          <div className={styles.form}>
            <h2 className={styles.h22}>Became a Service Provider</h2>
            <p className={styles.hr}></p>
            <div className={styles.rules}>
              <p>
                Join our platform to connect with more service providers. Enable
                online bookings and shocase your service's features, and make
                services more accessiable. Partner with us to facilitate
                engagement and passion for providing quality services.
              </p>
              <h4 className={styles.verify}>
                <span>
                  <Checkmark size='14px' />
                </span>
                Steps for verification
              </h4>
              <p>
                Your application needs to be approved before you can access our
                facilities. Please provide accurate and complete information
                along with the required documents as mentioned in our
                application form.
              </p>
              <p className={styles.hr}></p>
            </div>
            <div className={styles.main_content}>
              <div className={styles.leftcontent}>
                <span className={styles.title}>Hub's Information</span>
                <br />
                <label>Hub Name</label>
                <br />
                <input
                  className={styles.textfield}
                  type='text'
                  name='name'
                  id='name'
                  value={formData.name}
                  placeholder='Enter your hub name'
                  onChange={(e) => handleFormDataChange(e, 'name')}
                  required
                />
                <br />

                <label>Address</label>
                <br />
                <input
                  className={styles.textfield}
                  type='text'
                  name='address'
                  id='address'
                  value={formData.address}
                  placeholder='Enter hub address'
                  onChange={(e) => handleFormDataChange(e, 'address')}
                  required
                />
                <br />

                <label>Description</label>
                <br />
                <input
                  className={styles.textfield}
                  type='text'
                  name='description'
                  id='description'
                  value={formData.description}
                  placeholder='Enter short description'
                  onChange={(e) => handleFormDataChange(e, 'description')}
                  required
                />
                <br />

                <label>Avatar</label>
                <div className={styles.textField}>
                  <input
                    className={styles.textfield}
                    type='file'
                    name='avatar'
                    id='avatar'
                    onChange={(e) => handleFileChange(e, 'avatar')}
                    required
                  />
                </div>

                <label>Documents</label>
                <div className={styles.textField}>
                  <input
                    className={styles.textfield}
                    type='file'
                    name='documents'
                    id='documents'
                    onChange={(e) => handleFileChange(e, 'documents')}
                    required
                    multiple
                  />
                </div>
              </div>
              <div className={styles.rightcontent}>
                <span className={styles.title}>Personal's Information</span>
                <br />
                <label>Email</label>
                <br />
                <input
                  className={styles.textfield}
                  type='text'
                  name='email'
                  id='email'
                  value={formData.email}
                  placeholder='Enter your email'
                  onChange={(e) => handleFormDataChange(e, 'email')}
                  required
                />
                <br />

                <label>Full Name</label>
                <br />
                <input
                  className={styles.textfield}
                  type='text'
                  name='full_name'
                  id='full_name'
                  value={formData.full_name}
                  placeholder='Enter your full name'
                  onChange={(e) => handleFormDataChange(e, 'full_name')}
                  required
                />
                <br />
                <label>Phone</label>
                <br />
                <input
                  className={styles.textfield}
                  type='text'
                  name='phone_number'
                  id='phone_number'
                  value={formData.phone_number}
                  placeholder={`Enter your contact`}
                  onChange={(e) => handleFormDataChange(e, 'phone_number')}
                  required
                />
                <br />

                <label>Password</label>
                <br />
                <input
                  className={styles.textfield}
                  type='password'
                  name='password'
                  id='password'
                  value={formData.password}
                  placeholder={`Enter password you wan't to keep`}
                  onChange={(e) => handleFormDataChange(e, 'password')}
                  required
                />
                <br />
                <label>Citizenship Front</label>
                <br />
                <div className={styles.textField}>
                  <input
                    type='file'
                    name='citizenship_front'
                    id='citizenship_front'
                    onChange={(e) => handleFileChange(e, 'citizenship_front')}
                    required
                  />
                </div>
                <label>Citizenship Back</label>
                <br />
                <div className={styles.textField}>
                  <input
                    type='file'
                    name='citizenship_back'
                    id='citizenship_back'
                    onChange={(e) => handleFileChange(e, 'citizenship_back')}
                    required
                  />
                </div>
              </div>
            </div>
            <button className={styles.login} onClick={sendApplication}>
              Send Application
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AuthForm;
