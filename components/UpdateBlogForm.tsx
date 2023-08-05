'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { NewBlogPost } from '@/utils/types';
import { createContent } from '@/lib/client';

type Props = {
  publicUploadApiKey: string,
  publicUploadUrl: string, 
  createSignature: () => Promise<null | { timestamp: number, signature: string }>,
  createInDb: (data: FormData) => Promise<{ success: boolean }>,
  setPromptState: (params: { message: string, success: boolean } | null) => void
};

const UpdateBlogForm = ({ 
  publicUploadApiKey, 
  publicUploadUrl, 
  createSignature, 
  createInDb, 
  setPromptState 
  }: Props) => {

  const baseInputValues: NewBlogPost = { title: '', content: '', author: '', date: '' };

  const [inputValues, setInputValues] = useState<NewBlogPost>(baseInputValues);
  const [inputFiles, setInputFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;
    setInputValues({ ...inputValues, [key]: value });
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.currentTarget.files) return;
    const fileArray = Array.from(e.currentTarget.files);
    setInputFiles(fileArray);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await createContent(
        publicUploadApiKey, 
        publicUploadUrl, 
        Object.entries(inputValues), 
        inputFiles, 
        createSignature, 
        createInDb
      );
      if (response.success) {
        setPromptState({ message: 'Successfully created a new post', success: true });
      } else {
        throw new Error('Server error in creating a blog post');
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
        Create a new blog post:
      </h1>
      <div className='text-sm px-8 pb-4 max-w-lg'>
        <h1>Note:</h1>
        <p>For images:</p>
        <p>The images are hosted on Cloudinary, and with the current free plan, the maximum size for a single file is 10mb. So if the image file is larger the post will not be created. You can reduce the file size of an image with an image editing program, or there is probably even a website that you can use for this purpose.</p>
        <p>When uploading multiple images, I don&apos;t think that there is any limit to the collective size of all the files.</p>
        <p>Also, the image will be formatted to fit into a square on the site, so if the image in the file is not a square, it will get cropped. The best thing to do would be to crop it yourself with an image editing program to make sure that it displays the way that you want.</p>
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
          Author:
          <input 
            required
            name='author'
            value={inputValues.author}
            onChange={handleInputChange} 
          />
        </label>
        <label className='pb-4'>
          Date:
          <input 
            required
            name='date'
            value={inputValues.date}
            onChange={handleInputChange} 
          />
        </label>
        <label className='pb-4'>
          Upload Images:
          <input 
            type='file'
            multiple
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

export default UpdateBlogForm;