import axios from 'axios';
import React, { useContext, useState } from 'react';
import Header from '../../components/header/Header';
import axiosInstance from '../../config';
import { Context } from '../../context/context';
import styles from './Setting.module.css';

const Setting = (props) => {
  const { id, profilePic, dispatch } = useContext(Context);
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [newProfileImgURL, setNewProfileImgURL] = useState('');
  const [newId, setNewId] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPwd, setNewPwd] = useState('');
  console.log(newId, newEmail, newPwd);

  const selectProfileImg = async (e) => {
    if (e.target.files[0]) {
      const data = new FormData();
      const filename = `${Date.now()}${e.target.files[0].name}`;
      data.append('name', filename);
      data.append('file', e.target.files[0]);
      try {
        const response = await fetch(`https://api.lsevina126.asia/pic/upload`, {
          method: 'POST',
          mode: 'cors',
          body: data,
        });
        const updatedPicURL = await response.json();
        setNewProfileImgURL(updatedPicURL);
      } catch (err) {
        window.alert(err);
      }
    }
  };

  const updateUserData = async (event) => {
    event.preventDefault();
    try {
      if (newPwd === '') {
        const response = await axiosInstance.put(`/loginDatas/update`, {
          userId: id,
          updatedId: newId === '' ? id : newId,
          email: newEmail === '' ? email : newEmail,
          profilePic: newProfileImgURL === '' ? profilePic : newProfileImgURL,
        });
        dispatch({ type: 'LOGOUT' });
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            userId: response.data.sendUpdatedLoginData.userId,
            profilePic: response.data.sendUpdatedLoginData.profilePic,
            email: response.data.sendUpdatedLoginData.email,
          },
        });
      } else {
        const response = await axiosInstance.put(`/loginDatas/update`, {
          userId: id,
          updatedId: newId === '' ? id : newId,
          password: newPwd,
          email: newEmail === '' ? email : newEmail,
          profilePic: newProfileImgURL === '' ? profilePic : newProfileImgURL,
        });
        dispatch({ type: 'LOGOUT' });
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            userId: response.data.sendUpdatedLoginData.userId,
            profilePic: response.data.sendUpdatedLoginData.profilePic,
            email: response.data.sendUpdatedLoginData.email,
          },
        });
      }
      window.location.replace('/');
    } catch (err) {
      window.alert(err);
    }
  };

  const deleteUserData = async (e) => {
    try {
      await axiosInstance.delete(`/loginDatas/delete`, {
        data: { userId: id },
      });
      dispatch({ type: 'LOGOUT' });
      window.location.replace('/');
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <>
      <Header />
      <form className={styles.settingBox} onSubmit={updateUserData}>
        <h1>Setting Data</h1>
        <div className={styles.settingDataBox}>
          <h3>Input Your UserProfile</h3>
          <div className={styles.profileBox}>
            <div className={styles.imgBox}>
              <img
                src={newProfileImgURL === '' ? profilePic : newProfileImgURL}
                crossOrigin='anonymous'
              />
              <label htmlFor='profileImgInput'>
                <i
                  className={['far fa-user-circle', styles.settingsPPIcon].join(
                    ' '
                  )}
                ></i>
              </label>
              <input
                type='file'
                id='profileImgInput'
                style={{ display: 'none' }}
                onChange={selectProfileImg}
              />
            </div>
            <label>ID</label>
            <input
              type='text'
              defaultValue={id}
              onChange={(e) => setNewId(e.target.value)}
            />
            <label>Email</label>
            <input
              type='email'
              defaultValue={email}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type='password'
              onChange={(e) => setNewPwd(e.target.value)}
            />
          </div>
        </div>
        <button type='submit'>Update</button>
        <button onClick={deleteUserData} className={styles.deleteBtn}>
          Delete Your ID!
        </button>
      </form>
    </>
  );
};

export default Setting;
