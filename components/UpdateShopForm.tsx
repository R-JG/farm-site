'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { NewShopItem } from '@/utils/types';
import { createContent } from '@/lib/client';

type ShopItemRequest = Omit<NewShopItem, 'price' | 'inventory'>;

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

  const baseInputValues: ShopItemRequest = { name: '', description: '' };

  const [inputValues, setInputValues] = useState<ShopItemRequest>(baseInputValues);
  const [inputFiles, setInputFiles] = useState<File[]>([]);
  const [inputPriceObjects, setInputPriceObjects] = useState<{ amount: string, inventory: string }[]>([{ amount: '', inventory: '' }]);
  const [includeTax, setIncludeTax] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;
    setInputValues({ ...inputValues, [key]: value });
  };

  const handlePriceObjectInputChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;
    setInputPriceObjects(inputPriceObjects.map((price, i) => 
      (i === index) ? { ...price, [key]: value } : price)
    );
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.currentTarget.files) return;
    const fileArray = Array.from(e.currentTarget.files);
    setInputFiles(fileArray);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isSubmitting || (inputPriceObjects.length === 0)) return;
    setIsSubmitting(true);
    try {
      const priceInputKVs: [string, string][] = inputPriceObjects.map(price => 
        ['price', `${price.amount} ${price.inventory}`]
      );
      let valuesForFormData = Object.entries(inputValues);
      for (const kvPair of priceInputKVs) {
        valuesForFormData.push(kvPair);
      };
      valuesForFormData.push(['tax', (includeTax ? 'true' : 'false')]);
      const response = await createContent(
        publicUploadApiKey, 
        publicUploadUrl, 
        valuesForFormData, 
        inputFiles, 
        createSignature, 
        createInDb
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
      setInputPriceObjects([{ amount: '', inventory: '' }]);
      setIncludeTax(false);
      setIsSubmitting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
  };

  return (
    <div>
      <h1 className='mb-2 text-lg font-medium'>
        Create a new item for the shop page:
      </h1>
      <div className='text-sm px-8 pb-4 max-w-lg'>
        <h1>Note:</h1>
        <p className='font-semibold'>For images:</p>
        <p>The images are hosted on Cloudinary, and with the current free plan, the maximum size for a single file is 10mb. So if the image file is larger the post will not be created. You can reduce the file size of an image with an image editing program, or there is probably even a website that you can use for this purpose.</p>
        <p>When uploading multiple images, I don&apos;t think that there is any limit to the collective size of all the files.</p>
        <p>Also, the image will be formatted to fit into a square on the site, so if the image in the file is not a square, it will get cropped. The best thing to do would be to crop it yourself with an image editing program to make sure that it displays the way that you want.</p>
        <p className='font-semibold'>For tax:</p>
        <p>Checking the box will override the default tax category (this can be viewed in Stripe&apos;s tax settings — currently it is Food for Non-Immediate Consumption, which is untaxed).</p> 
        <p>When checked, it will set it instead to: General - Tangible Goods (Stripe tax code: txcd_99999999).</p>
        <p className='font-semibold'>For inventory:</p>
        <p>Leave the input blank for an unlimited inventory.</p>
      </div>
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
            className='ml-2'
          />
        </label>
        <label className='pb-4'>
          Description:
          <textarea 
            required
            name='description'
            value={inputValues.description}
            onChange={handleInputChange} 
            className='ml-2'
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
            className='ml-2'
          />
        </label>
        <label>
          Add tax to the item?
          <input
            type='checkbox'
            checked={includeTax}
            onChange={e => setIncludeTax(e.currentTarget.checked)}
            className='ml-2'
          />
        </label>
        {inputPriceObjects.map((priceObject, index) => 
        <div 
          key={index} 
          className='my-2'
        >
          <label className='pb-4'>
            Price:
            <input 
              required
              type='number'
              name='amount'
              value={priceObject.amount}
              onChange={e => handlePriceObjectInputChange(e, index)} 
              className='mx-2'
            />
          </label>
          <label className='pb-4'>
            Inventory:
            <input 
              type='number'
              name='inventory'
              value={priceObject.inventory}
              onChange={e => handlePriceObjectInputChange(e, index)} 
              className='ml-2'
            />
          </label>
          <button
            type='button'
            onClick={() => setInputPriceObjects(inputPriceObjects.filter((_, i) => (i !== index)))}
            className='px-2 mx-2 bg-blue-200 rounded-2xl'
          >
            X
          </button>
        </div>)}
        <button
          type='button'
          onClick={() => setInputPriceObjects(inputPriceObjects.concat({ amount: '', inventory: '' }))}
          className='p-1 m-4 bg-blue-200 rounded'
        >
          Add a price
        </button>
        <button className='p-2 m-4 bg-blue-200 rounded active:bg-blue-100 hover:scale-105 transition-all'>
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default UpdateShopForm;