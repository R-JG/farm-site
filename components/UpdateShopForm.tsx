'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { NewShopItem } from '@/utils/types';

type ShopItemRequest = Omit<NewShopItem, 'images' | 'price'> & { imageFiles: File[], price: string };

type Props = {
  databaseService: (data: FormData) => Promise<{ success: boolean }>,
  setPromptState: (params: { message: string, success: boolean } | null) => void
};

const UpdateShopForm = ({ databaseService, setPromptState }: Props) => {

  const baseInputValues = { name: '', description: '', price: '', imageFiles: [] };

  const [inputValues, setInputValues] = useState<ShopItemRequest>(baseInputValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;
    setInputValues({ ...inputValues, [key]: value });
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.currentTarget.files) return;
    const imageFiles = Array.from(e.currentTarget.files);
    setInputValues({ ...inputValues, imageFiles });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isSubmitting) return;
    const formData = new FormData();
    Object.entries(inputValues).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach(file => {
          if (file instanceof File) {
            formData.append(file.name, file);
          };
        });
      } else {
        formData.append(k, v);
      };
    });
    setIsSubmitting(true);
    try {
      const response = await databaseService(formData);
      if (response.success) {
        setPromptState({ message: 'Successfully created a new item', success: true });
      } else {
        throw new Error('Server Error');
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
          Upload Image:
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