'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { NewHomePost } from '@/utils/types';

type HomePostUpload = Omit<NewHomePost, 'images'> & { imageFile: File | null };

type Props = {
  databaseService: (data: FormData) => Promise<{ success: boolean }> 
};

const UpdateNewsForm = ({ databaseService }: Props) => {

  const baseInputValues = { title: '', content: '', link: '', linkText: '', imageFile: null };

  const [inputValues, setInputValues] = useState<HomePostUpload>(baseInputValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;
    setInputValues({ ...inputValues, [key]: value });
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.currentTarget.files) return;
    const imageFile = e.currentTarget.files[0];
    setInputValues({ ...inputValues, imageFile });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isSubmitting) return;
    const formData = new FormData();
    Object.entries(inputValues).forEach(([k, v]) => formData.append(k, v ?? ''));
    setIsSubmitting(true);
    try {
      const result = await databaseService(formData);
      console.log(result);
      /*
      if (success) {
        setPromptMessage('Successfully created a post');
      } else {
        throw new Error('Server Error');
      };
      */
    } catch (error) {
      console.error(error);
      setPromptMessage('Post creation was unsuccessful');
    } finally {
      setInputValues(baseInputValues);
      setIsSubmitting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
  };

  return (
    <div>
      <form 
        onSubmit={handleSubmit}
        className='flex flex-row justify-start items-start'
      >
        <label htmlFor='title'>Title</label>
        <input
          required 
          id='title'
          name='title'
          value={inputValues.title}
          onChange={handleInputChange} 
        />
        <label htmlFor='content'>Content</label>
        <textarea 
          required
          id='content'
          name='content'
          value={inputValues.content}
          onChange={handleInputChange} 
        />
        <label htmlFor='link'>Link Route</label>
        <input 
          id='link'
          name='link'
          value={inputValues.link ?? ''}
          onChange={handleInputChange} 
        />
        <label htmlFor='linkText'>Link Text</label>
        <input 
          id='linkText'
          name='linkText'
          value={inputValues.linkText ?? ''}
          onChange={handleInputChange} 
        />
        <label htmlFor='imageFile'>Upload Image</label>
        <input 
          required
          type='file'
          accept='.jpg,.jpeg,.png,.webp,.avif,.svg'
          id='imageFile'
          name='imageFile'
          onChange={handleFileInputChange} 
          ref={fileInputRef}
        />
        <button className='bg-slate-50 p-3 mx-5 rounded-lg'>
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </form>
      {promptMessage && 
      <div className='m-4 bg-cyan-300'>
        <p>{promptMessage}</p>
        <button onClick={() => setPromptMessage('')}>Close</button>
      </div>}
    </div>
  );
};

export default UpdateNewsForm;