'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { NewHomePost } from '@/utils/types';

interface Props {
  createHomePost: (newPostData: NewHomePost) => Promise<void>
};

const TEST_AdminForms = ({ createHomePost }: Props) => {

  const baseHomePostInputs = { title: '', content: '', image: '', link: '' };

  const [homePostInputs, setHomePostInputs] = useState<{ title: string, content: string, image: string, link: string }>(baseHomePostInputs);

  const handleHomePostInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;
    setHomePostInputs({ ...homePostInputs, [key]: value });
  };

  const handleCreateHomePostSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const newPostData: NewHomePost = { 
      title: homePostInputs.title,
      content: homePostInputs.content,
      link: homePostInputs.link,
      images: [homePostInputs.image]
    };
    try {
      createHomePost(newPostData);
    } finally {
      setHomePostInputs(baseHomePostInputs);
    };
  };

  return (
    <div className='p-8'>
      <h1>Create Home Post</h1>
      <form 
        className='bg-slate-500 my-3 p-4 flex flex-row justify-start items-center flex-wrap'
        onSubmit={handleCreateHomePostSubmit}
      >
        <label htmlFor='HomePost--title'>Title</label>
        <input 
          id='HomePost--title'
          name='title'
          value={homePostInputs.title}
          onChange={handleHomePostInputChange} 
        />
        <label htmlFor='HomePost--content'>Content</label>
        <input 
          id='HomePost--content'
          name='content'
          value={homePostInputs.content}
          onChange={handleHomePostInputChange} 
        />
        <label htmlFor='HomePost--link'>Link</label>
        <input 
          id='HomePost--link'
          name='link'
          value={homePostInputs.link}
          onChange={handleHomePostInputChange} 
        />
        <label htmlFor='HomePost--image'>Image src</label>
        <input 
          id='HomePost--image'
          name='image'
          value={homePostInputs.image}
          onChange={handleHomePostInputChange} 
        />
        <button className='bg-slate-50 p-3 mx-5 rounded-lg'>Create</button>
      </form>
    </div>
  );
};

export default TEST_AdminForms;