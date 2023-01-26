import React, { useContext, useState } from 'react';
import Header from '../../components/header/Header';
import axiosInstance from '../../config';
import { Context } from '../../context/context';
import styles from './Contact.module.css';

const Contact = (props) => {
  const [name, setName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const { id } = useContext(Context);
  const [originEmail, setOriginEmail] = useState(localStorage.getItem('email'));

  const onSendEmail = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosInstance.post(`/contacts`, {
        customerName: name === '' ? id : name,
        email: customerEmail === '' ? originEmail : customerEmail,
        number: number,
        message: message,
      });
      window.alert(`${res.data.savedNewContact.customerName} email sent!!`);
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <>
      <Header />
      <section className={styles.contact} id='contact'>
        <div className={styles.contactInfoBox}>
          <div className={styles.mapBox}></div>
          <form onSubmit={onSendEmail} className={styles.infoBox}>
            <label>Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type='text'
              placeholder='Enter your name...'
              defaultValue={id}
            />
            <label>Email</label>
            <input
              onChange={(e) => setCustomerEmail(e.target.value)}
              type='email'
              placeholder='Enter your Email...'
              defaultValue={id ? originEmail : customerEmail}
            />
            <label>Number</label>
            <input
              onChange={(e) => setNumber(e.target.value)}
              type='number'
              placeholder='Enter your Number...'
              defaultValue={number}
            />
            <label>Message</label>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Type your message to me...'
              defaultValue={message}
            ></textarea>
            <button type='submit'>Send Message</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
