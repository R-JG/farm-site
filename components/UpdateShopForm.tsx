'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { NewShopItem } from '@/utils/types';
import { createContent } from '@/utils/client';

type ShopItemRequest = Omit<NewShopItem, 'price'> & { price: string };

type Props = {
  publicUploadApiKey: string,
  publicUploadUrl: string, 
  createSignature: () => Promise<null | { timestamp: number, signature: string }>,
  createInDb: (data: FormData) => Promise<{ success: boolean }>,
  setPromptState: (params: { message: string, success: boolean } | null) => void
};

const UpdateShopForm = ({
  publicUploadApiKey,
  publicUploadUrl,
  createSignature,
  createInDb,
  setPromptState
  }: Props) => {

  const baseInputValues: ShopItemRequest = { name: '', description: '', price: '' };

  const [inputValues, setInputValues] = useState<ShopItemRequest>(baseInputValues);
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
        publicUploadApiKey, publicUploadUrl, inputValues, inputFiles, createSignature, createInDb
      );
      if (response.success) {
        setPromptState({ message: 'Successfully created a new item', success: true });
      } else {
        throw new Error('Server error in creating a shop item');
      };
    } catch (error) {
      console.error(error);
      setPromptState({ message: 'Item creation was unsuccessful', success: false });
    } finally {
      setInputValues(baseInputValues);
      setIsSubmitting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
  };

  return (
    <div>
      <h1 className='mb-2 text-lg font-medium'>
        Create a new item for the shop page:
      </h1>
      <form 
        onSubmit={handleSubmit}
        className='p-8 border-2 border-black rounded-xl flex flex-col justify-start items-start'
      >
        <label className='pb-4'>
          Name:
          <input
            required 
            name='name'
            value={inputValues.name}
            onChange={handleInputChange} 
          />
        </label>
        <label className='pb-4'>
          Description:
          <textarea 
            required
            name='description'
            value={inputValues.description}
            onChange={handleInputChange} 
          />
        </label>
        <label className='pb-4'>
          Price:
          <input 
            required
            type='number'
            name='price'
            value={inputValues.price}
            onChange={handleInputChange} 
          />
        </label>
        <label className='pb-4'>
          Upload Images:
          <input 
            required
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

export default UpdateShopForm;