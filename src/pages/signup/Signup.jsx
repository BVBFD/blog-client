import React, { useContext, useState } from 'react';
import Header from '../../components/header/Header';
import styles from './Signup.module.css';
import { Context } from '../../context/context.js';
import axiosInstance from '../../config';

const Signup = (props) => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const { dispatch } = useContext(Context);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const onSignUp = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosInstance.post(`/loginDatas/signup`, {
        userId: id,
        password: pwd,
        email: email,
        profilePic: '',
        editable: false,
      });

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          userId: res.data.data.userId,
          // token: res.data.token,
          email: res.data.data.email,
          profilePic: res.data.data.profilePic,
          editable: res.data.data.editable,
        },
      });
    } catch (err) {
      window.alert(err);
    }
    setLoginSuccess(true);
  };
  loginSuccess && window.location.replace('/');

  return (
    <>
      <Header />
      <form className={styles.signupBox} onSubmit={onSignUp}>
        <div>
          <span>Sign-up</span>
        </div>
        <div className={styles.idBox}>
          <span>ID</span>
          <input
            type='text'
            autoFocus
            placeholder='Enter your ID'
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className={styles.emailBox}>
          <span>Email</span>
          <input
            type='email'
            autoFocus
            placeholder='Enter your Email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.pwdBox}>
          <span>Password</span>
          <input
            type='password'
            onChange={(e) => setPwd(e.target.value)}
            placeholder='Enter your Password'
          />
        </div>
        <button type='submit'>Sign-up</button>
      </form>
    </>
  );
};

export default Signup;
