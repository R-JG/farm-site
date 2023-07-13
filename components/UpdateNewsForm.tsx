'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { NewHomePost } from '@/utils/types';

type HomePostUpload = Omit<NewHomePost, 'images'> & { imageFile: File | null };

type Props = {
  databaseService: (data: FormData) => Promise<{ success: boolean }>,
  setPromptState: (params: { message: string, success: boolean } | null) => void
};

const UpdateNewsForm = ({ databaseService, setPromptState }: Props) => {

  const baseInputValues = { title: '', content: '', link: '', linkText: '', imageFile: null };

  const [inputValues, setInputValues] = useState<HomePostUpload>(baseInputValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const response = await databaseService(formData);
      if (response.success) {
        setPromptState({ message: 'Successfully created a new post', success: true });
      } else {
        throw new Error('Server Error');
      };
    } catch (error) {
      console.error(error);
      setPromptState({ message: 'Post creation was unsuccessful', success: false });
    } finally {
      setInputValues(baseInputValues);
      setIsSubmitting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
  };

  return (
    <div>
      <h1 className='mb-2 text-lg font-medium'>
        Create a new post for the news page:
      </h1>
      <div className='text-sm px-8 pb-4 max-w-lg'>
        <h1>Note:</h1>
        <p>The link route can either be a link to a page on this site or to an external site, or blank for no link. For an external site, just copy the whole url and paste it in. For a page on this site, you will need to copy only the portion of the url that looks something like this:  /shop  or  /blog  or  /glamping  and anything that comes after this part of the url, e.g. a shop item might look like:  /shop/5</p>
        <p>The link text is just the text that the button displays.</p>
      </div>
      <form 
        onSubmit={handleSubmit}
        className='p-8 border-2 border-black rounded-xl flex flex-col justify-start items-start'
      >
        <label className='pb-4'>
          Title:
          <input
            required 
            name='title'
            value={inputValues.title}
            onChange={handleInputChange} 
          />
        </label>
        <label className='pb-4'>
          Content:
          <textarea 
            required
            name='content'
            value={inputValues.content}
            onChange={handleInputChange} 
          />
        </label>
        <label className='pb-4'>
          Link Route:
          <input 
            name='link'
            value={inputValues.link ?? ''}
            onChange={handleInputChange} 
          />
        </label>
        <label className='pb-4'>
          Link Text:
          <input 
            name='linkText'
            value={inputValues.linkText ?? ''}
            onChange={handleInputChange} 
          />
        </label>
        <label className='pb-4'>
          Upload Image:
          <input 
            required
            type='file'
            accept='.jpg,.jpeg,.png,.webp,.avif,.svg'
            name='imageFile'
            onChange={handleFileInputChange} 
            ref={fileInputRef}
          />
        </label>
        <button className='p-2 m-4 bg-blue-200 rounded active:bg-blue-100 hover:scale-105 transition-all'>
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default UpdateNewsForm;