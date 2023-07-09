'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

const NewsletterForm = () => {

  const [emailInputValue, setEmailInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmailInputValue(e.currentTarget.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

  };

  return (
    <form 
      onSubmit={handleFormSubmit}
      className=''
    >
      <h3 className='mb-1'>
        Subscribe to our newsletter!
      </h3>
      <input
        type='email'
        placeholder='Email address' 
        value={emailInputValue}
        onChange={handleInputChange}
        className='p-1 mr-3 border-blue-100 border-2 rounded'
      />
      <button className='p-2 bg-blue-200 rounded active:bg-blue-300 transition-colors'>
        Subscribe
      </button>
    </form>
  );
};

export default NewsletterForm;