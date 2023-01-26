import React, { useContext, useRef, useState } from 'react';
import Header from '../../components/header/Header';
import { Context } from '../../context/context.js';
import styles from './Login.module.css';
import axiosInstance from '../../config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { id, dispatch } = useContext(Context);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const idRef = useRef();
  const pwdRef = useRef();
  const navigate = useNavigate();

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosInstance.post(`/loginDatas/login`, {
        userId: idRef.current.value,
        password: pwdRef.current.value,
      });

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          userId: res.data.sendLoginData.userId,
          profilePic: res.data.sendLoginData.profilePic,
          editable: res.data.sendLoginData.editable,
          email: res.data.sendLoginData.email,
        },
      });
    } catch (err) {
      window.alert(err);
    }
    setLoginSuccess(true);
  };

  navigate('/');

  return (
    <>
      <Header />
      <form className={styles.loginBox} onSubmit={onLogin}>
        <div>
          <span>Login</span>
        </div>
        <div className={styles.idBox}>
          <span>ID</span>
          <input
            ref={idRef}
            type='text'
            autoFocus
            placeholder='Enter your ID'
          />
        </div>
        <div className={styles.pwdBox}>
          <span>Password</span>
          <input
            ref={pwdRef}
            type='password'
            placeholder='Enter your password'
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  );
};

export default Login;
