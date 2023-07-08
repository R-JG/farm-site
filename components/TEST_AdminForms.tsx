'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { NewHomePost, NewBlogPost } from '@/utils/types';

type Props = {
  createHomePost: (newPostData: NewHomePost) => Promise<void>,
  createBlogPost: (newPostData: NewBlogPost) => Promise<void>
};

const TEST_AdminForms = ({ createHomePost, createBlogPost }: Props) => {

  const baseHomePostInputs = { title: '', content: '', image: '', link: '' };
  const baseBlogPostInputs = { title: '', content: '', author: '', date: '' };

  const [homePostInputs, setHomePostInputs] = useState<{ title: string, content: string, image: string, link: string }>(baseHomePostInputs);
  const [blogPostInputs, setBlogPostInputs] = useState<{ title: string, content: string, author: string, date: string }>(baseBlogPostInputs);

  const handleHomePostInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;
    setHomePostInputs({ ...homePostInputs, [key]: value });
  };

  const handleBlogPostInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;
    console.log(key, value);
    setBlogPostInputs({ ...blogPostInputs, [key]: value });
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

  const handleCreateBlogPostSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const newPostData: NewBlogPost = { 
      title: blogPostInputs.title,
      content: blogPostInputs.content,
      author: blogPostInputs.author,
      date: blogPostInputs.date,
      images: []
    };
    try {
      createBlogPost(newPostData);
    } finally {
      setBlogPostInputs(baseBlogPostInputs);
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


      <h1>Create Blog Post</h1>
      <form 
        className='bg-slate-500 my-3 p-4 flex flex-row justify-start items-center flex-wrap'
        onSubmit={handleCreateBlogPostSubmit}
      >
        <label htmlFor='BlogPost--title'>Title</label>
        <input 
          id='BlogPost--title'
          name='title'
          value={blogPostInputs.title}
          onChange={handleBlogPostInputChange} 
        />
        <label htmlFor='BlogPost--content'>Content</label>
        <textarea 
          id='BlogPost--content'
          name='content'
          value={blogPostInputs.content}
          onChange={handleBlogPostInputChange} 
        />
        <label htmlFor='BlogPost--author'>Author</label>
        <input 
          id='BlogPost--author'
          name='author'
          value={blogPostInputs.author}
          onChange={handleBlogPostInputChange} 
        />
        <label htmlFor='BlogPost--date'>Date</label>
        <input 
          id='BlogPost--date'
          name='date'
          value={blogPostInputs.date}
          onChange={handleBlogPostInputChange} 
        />
        <button className='bg-slate-50 p-3 mx-5 rounded-lg'>Create</button>
      </form>
    </div>
  );
};

export default TEST_AdminForms;