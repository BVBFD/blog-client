import React from 'react';
import Header from '../../components/header/Header';
import styles from './About.module.css';

const About = (props) => {
  return (
    <>
      <Header />
      <section className={styles.about}>
        <header className={styles.pageTitle}>About</header>
        <div className={styles.aboutIntroBox}>
          <div className={styles.imgBox}>
            <img src='../images/charina.gif' alt='' />
          </div>
          <div className={styles.aboutExplainBox}>
            <header>This Blog is ...</header>
            <p>
              This Blog is my final goal of learning programming language. I
              think craeting new blog website just by my self is the standard of
              IT Job seekers' skills to get used to working on the field for my
              customers. I am always trying to keep up with new skills trends.
            </p>
            <a
              href='https://bvbfd.github.io/Portfolio-Website-ver2.0/'
              target='_blank'
            >
              <button>Visit Profile</button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
