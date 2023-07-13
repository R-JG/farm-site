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

  const handleCreateModeButton = (): void => {
    (mode !== 'create') ? setMode('create') : setMode('none')
  };

  const handleEditModeButton = (): void => {
    (mode !== 'edit') ? setMode('edit') : setMode('none')
  };

  const handleDeleteModeButton = (): void => {
    (mode !== 'delete') ? setMode('delete') : setMode('none')
  };

  return (
    <div className='flex flex-col justify-start items-center'>
      <div>
        <button 
          onClick={handleCreateModeButton}
          className='p-2 m-4 bg-blue-200 rounded active:bg-blue-100 hover:scale-105 transition-all'
        >
          {(mode !== 'create') ? 'Create New Post' : 'Cancel'}
        </button>
        {(mode === 'create') && 
        <UpdateNewsForm databaseService={createPost} />}
      </div>
      {(mode !== 'create') && allPosts.map(post => 
      <div 
        key={post.id}
        className=' border-red-600 border-4'
      >
        <div>
          <h1>{post.title}</h1>
        </div>
        <div>
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
  );
};

export default UpdateNewsInterface;