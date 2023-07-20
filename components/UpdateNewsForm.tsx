'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { NewNewsPost } from '@/utils/types';

type NewsPostRequest = Omit<NewNewsPost, 'images'>;

type Props = {
  publicUploadApiKey: string,
  publicUploadUrl: string, 
  createSignature: () => Promise<{ timestamp: number, signature: string }>,
  databaseService: (data: FormData) => Promise<{ success: boolean }>,
  setPromptState: (params: { message: string, success: boolean } | null) => void
};

const UpdateNewsForm = ({ 
  publicUploadApiKey, 
  publicUploadUrl, 
  createSignature, 
  databaseService, 
  setPromptState 
  }: Props) => {

  const baseInputValues = { title: '', content: '', link: '', linkText: '' };

  const [inputValues, setInputValues] = useState<NewsPostRequest>(baseInputValues);
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

  const uploadFiles = async () => {
    let uploadRequests: Promise<Response>[] = [];
    if (inputFiles.length > 0) {
      const { timestamp, signature } = await createSignature();
      for (const file of inputFiles) {
        let cloudinaryFormData = new FormData();
        cloudinaryFormData.append('api_key', publicUploadApiKey);
        cloudinaryFormData.append('signature', signature);
        cloudinaryFormData.append('timestamp', String(timestamp));
        cloudinaryFormData.append('folder', 'farm-site');
        cloudinaryFormData.append('file', file);
        uploadRequests.push(
          fetch(publicUploadUrl, { method: 'POST', body: cloudinaryFormData })
        );
      };
    };
    return Promise.all(uploadRequests);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const responseArray = await uploadFiles();
      responseArray.forEach(response => {
        if (!response.ok) throw new Error('not all images could be uploaded');
      });
      let imageIds: string[] = [];
      await Promise.all(responseArray.map(response => new Promise((resolve, reject) => {
        response.json().then(responseData => {
          if ((typeof responseData === 'object') && ('public_id' in responseData)) {
            imageIds.push(responseData.public_id);
            resolve(undefined);
          } else {
            reject('public_id property is missing from the response data');
          };
        });
      }))); 
      let dbFormData = new FormData();
      Object.entries(inputValues).forEach(([k, v]) => dbFormData.append(k, v ?? ''));
      imageIds.forEach(id => dbFormData.append('imageIds', id));
      const response = await databaseService(dbFormData);
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



            multiple



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