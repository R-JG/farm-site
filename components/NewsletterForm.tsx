'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

type Props = {
  addNewsletterSubscriber: (email: string) => Promise<void>
};

const NewsletterForm = ({ addNewsletterSubscriber }: Props) => {

  const [buttonText, setButtonText] = useState<'Subscribe' | 'Thanks for subscribing!'>('Subscribe');
  const [emailInputValue, setEmailInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmailInputValue(e.currentTarget.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (emailInputValue === '') return;
    try {
      addNewsletterSubscriber(emailInputValue);
    } catch (error) {
      console.error(error);
    } finally {
      setEmailInputValue('');
      setButtonText('Thanks for subscribing!');
    };
  };

  return (
    <form 
      onSubmit={handleFormSubmit}
      className='min-w-[26rem] pl-10 flex flex-col'
    >
      <span className='mb-1'>
        Subscribe to our newsletter!
      </span>
      <div className='flex flex-row justify-start items-center'>
        <input
          type='email'
          placeholder='Email address' 
          value={emailInputValue}
          onChange={handleInputChange}
          className='p-1 mr-3 border-blue-100 border-2 rounded'
        />
        <button className='p-2 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'>
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default NewsletterForm;