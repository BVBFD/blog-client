import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/context';
import styles from './Header.module.css';

const Header = () => {
  const { id, dispatch, profilePic } = useContext(Context);
  const barRef = useRef();
  const exitRef = useRef();
  const mobileCoverBoxRef = useRef();

  const onLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <header className={styles.header}>
      <span
        ref={barRef}
        onClick={(e) => {
          e.target.parentNode.classList.toggle(styles.toggle);
          exitRef.current.classList.toggle(styles.toggle);
          mobileCoverBoxRef.current.classList.remove(
            styles.mobileCoverBoxToggle
          );
        }}
        className={`${styles.toggleBar} ${styles.toggle}`}
      >
        <i class='fa-solid fa-bars'></i>
      </span>
      <span
        ref={exitRef}
        onClick={(e) => {
          e.target.parentNode.classList.toggle(styles.toggle);
          barRef.current.classList.toggle(styles.toggle);
          mobileCoverBoxRef.current.classList.add(styles.mobileCoverBoxToggle);
        }}
        className={`${styles.toggleExit} ${styles.toggle}`}
      >
        <i class='fa-solid fa-xmark'></i>
      </span>
      <div className={styles.socialSNSs}>
        <a href='https://github.com/BVBFD'>
          <i class='fa-brands fa-github-square'></i>
        </a>
      </div>
      <div
        ref={mobileCoverBoxRef}
        className={`${styles.mobileCoverBox} ${styles.mobileCoverBoxToggle}`}
      >
        <div className={styles.pageLinks}>
          <Link className='link' to={'/'}>
            <span>HOME</span>
          </Link>
          <Link className='link' to={'/about'}>
            <span>ABOUT</span>
          </Link>
          <Link className='link' to={'/contact'}>
            <span>CONTACT</span>
          </Link>
          <Link className='link' to={'/write'}>
            <span>WRITE</span>
          </Link>
        </div>
        {!id ? (
          <div className={styles.settingsBox}>
            <Link className='link' to={'/login'}>
              <span>LOGIN</span>
            </Link>
            <Link className='link' to={'/signup'}>
              <span>SIGN-UP</span>
            </Link>
          </div>
        ) : (
          <div className={styles.logoutBox}>
            <span onClick={onLogout}>Log-out</span>
            <Link to={'/setting'}>
              <div className={styles.profileImgBox}>
                <img src={profilePic} crossOrigin='anonymous' />
              </div>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
