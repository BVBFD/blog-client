import React from "react";
import styles from "./SidebarAboutMe.module.css";

const SidebarAboutMe = ({ setSideBarAccessIndex }) => {
  const setIndex = (e) => {
    if (e.target.nodeName === "SPAN") {
      setSideBarAccessIndex(e.target.innerText);
    }
  };

  return (
    <div className={styles.aboutMePart}>
      <header className={styles.aboutMeHeader}>About Me</header>
      <div className={styles.aboutMeImgBox}>
        <img src="../images/charina.gif" alt="" />
      </div>
      <p style={{ fontWeight: "bold" }}>Front-End, Back-End Web Developer.</p>
      <p style={{ fontWeight: "bold" }}>
        Sharing My value and knowledge for others.
      </p>
      <header className={styles.catHeader}>CATEGORIES</header>
      <div onClick={setIndex} className={styles.catBox}>
        <span>HTML / Git</span>
        <span>CSS</span>
        <span>JavaScript</span>
        <span>Front-End</span>
        <span>Back-End</span>
        <span>TypeScript</span>
        <span>Game</span>
        <span>Book / Learn</span>
      </div>
      <header className={styles.catSNSBox}>FOLLOW US</header>
      <div className={styles.snsMarks}>
        <i class="fab fa-facebook-square"></i>
        <i class="fab fa-twitter-square"></i>
        <i class="fab fa-pinterest-square"></i>
        <i class="fab fa-instagram-square"></i>
      </div>
    </div>
  );
};

export default SidebarAboutMe;
