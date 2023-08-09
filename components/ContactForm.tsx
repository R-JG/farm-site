'use client';

import { useState, FormEvent } from 'react';

const ContactForm = () => {

  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [messageValue, setMessageValue] = useState('');

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {

  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className='w-fit p-12 mb-14 bg-blue-50 rounded-2xl flex flex-col justify-start items-center'
    >
      <span className='mb-4'>
        Let&apos;s get in touch:
      </span>
      <label>
        Name:
        <input 
          type='text'
          value={nameValue}
          onChange={e => setNameValue(e.currentTarget.value)}
          className='mb-4 ml-2'
        />
      </label>
      <label>
        Email:
        <input 
          type='email'
          required
          value={emailValue}
          onChange={e => setEmailValue(e.currentTarget.value)}
          className='mb-4 ml-2'
        />
      </label>
      <label>
        <textarea 
          required
          value={messageValue}
          onChange={e => setMessageValue(e.currentTarget.value)}
          className=' min-w-[20rem] min-h-[7rem]'
        />
      </label>
    </form>
  );
};

export default ContactForm;