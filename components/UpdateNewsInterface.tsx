'use client';

import { useState } from 'react';
import { HomePost } from '@/utils/types';
import UpdateNewsForm from './UpdateNewsForm';

type Props = {
  allPosts: HomePost[],
  createPost: (postUploadData: FormData) => Promise<{ success: boolean }>
};

const UpdateNewsInterface = ({ allPosts, createPost }: Props) => {

  const [mode, setMode] = useState<'create' | 'edit' | 'delete' | 'none'>('none');
  const [promptState, setPromptState] = useState<{ message: string, success: boolean } | null>(null);

  const handleCreateModeButton = (): void => {
    (mode !== 'create') ? setMode('create') : setMode('none')
  };

  const handleEditModeButton = (): void => {
    (mode !== 'edit') ? setMode('edit') : setMode('none')
  };

  const handleDeleteModeButton = (): void => {
    (mode !== 'delete') ? setMode('delete') : setMode('none')
  };

  console.log(promptState);

  return (
    <div className='px-6 flex flex-col justify-start items-center'>
      {promptState && 
      <div className={`absolute bottom-3 p-4 m-4 rounded-2xl flex flex-row justify-center items-center ${promptState.success ? 'border-green-600 border-4 bg-green-200' : 'border-red-600 border-4 bg-red-200'}`}>
        <p className={`text-lg font-medium ${promptState.success ? 'text-green-600' : 'text-red-600'}`}>
          {promptState.message}
        </p>
        <button 
          onClick={() => setPromptState(null)}
          className=' relative left-3 bottom-4 px-2 py-1 m-2 rounded-3xl bg-blue-200 hover:scale-110 transition-transform'
        >
          ✕
        </button>
      </div>}
      <button 
        onClick={handleCreateModeButton}
        className='p-2 m-12 bg-blue-200 rounded active:bg-blue-100 hover:scale-105 transition-all'
      >
        {(mode !== 'create') ? 'Create New Post' : 'Back to Options'}
      </button>
      {(mode === 'create') && 
      <div className='mb-12'>
        <UpdateNewsForm 
          databaseService={createPost} 
          setPromptState={setPromptState}
        />
      </div>}
      {(mode !== 'create') && 
      <div className='py-4 border-t-2 border-black flex flex-col justify-start items-center'>
        <p className='mb-4 text-xl font-medium underline'>Current posts on the news page:</p>
        <div className='flex flex-row justify-start items-start flex-wrap'>
          {allPosts.map(post => 
          <div 
            key={post.id}
            className=' max-w-sm p-4 m-4 border-black border-2 rounded-2xl'
          >
            <div>
              <h1 className='text-lg font-medium mb-2'>
                {post.title}
              </h1>
              <p className=' line-clamp-3'>
                {post.content}
              </p>
            </div>
            <div className='flex flex-row justify-center items-center'>
              <button 
                onClick={handleEditModeButton}
                className='p-2 m-4 bg-blue-200 rounded active:bg-blue-100 hover:scale-105 transition-all'
              >
                Edit
              </button>
              <button 
                onClick={handleDeleteModeButton}
                className='p-2 m-4 bg-blue-200 rounded active:bg-blue-100 hover:scale-105 transition-all'
              >
                Delete
              </button>
            </div>
          </div>)}
        </div>
      </div>}
    </div>
  );
};

export default UpdateNewsInterface;