'use client';

import { useState } from 'react';
import { BlogPost } from '@/utils/types';
import UpdateBlogForm from './UpdateBlogForm';

type Props = {
  publicUploadApiKey: string,
  publicUploadUrl: string, 
  allBlogPosts: BlogPost[],
  createSignature: () => Promise<null | { timestamp: number, signature: string }>,
  createBlogPost: (postRequestData: FormData) => Promise<{ success: boolean }>,
  deleteBlogPost: (postId: number) => Promise<{ success: boolean }>
};

const UpdateBlogInterface = ({ 
  publicUploadApiKey, 
  publicUploadUrl, 
  allBlogPosts, 
  createSignature,
  createBlogPost, 
  deleteBlogPost 
  }: Props) => {
    
  const [interfaceMode, setInterfaceMode] = useState<'create' | 'edit' | 'delete' | 'none'>('none');
  const [promptState, setPromptState] = useState<{ message: string, success: boolean } | null>(null);
  const [postToDeleteId, setPostToDeleteId] = useState<number | null>(null);
  const [postIsBeingDeleted, setPostIsBeingDeleted] = useState<boolean>(false);

  const handleCreateModeButton = (): void => {
    (interfaceMode !== 'create') ? setInterfaceMode('create') : setInterfaceMode('none')
  };

  const handleDeleteModeButton = (postId: number): void => {
    if (postIsBeingDeleted) return;
    setInterfaceMode('delete');
    setPostToDeleteId(postId);
  };

  const handleCancelDeleteButton = (): void => {
    setInterfaceMode('none');
    setPostToDeleteId(null);
  };

  const handleDeletePostButton = async (): Promise<void> => {
    if (!postToDeleteId || postIsBeingDeleted) return;
    setPostIsBeingDeleted(true);
    try {
      const response = await deleteBlogPost(postToDeleteId);
      if (response.success) {
        setPromptState({ message: 'Successfully deleted the post', success: true });
      } else {
        throw new Error('Server Error');
      };
    } catch (error) {
      console.error(error);
      setPromptState({ message: 'There was an error in deleting the post', success: false });
    } finally {
      setPostToDeleteId(null);
      setInterfaceMode('none');
      setPostIsBeingDeleted(false);
    };
  };

  return (
    <div className='px-6 flex flex-col justify-start items-center'>
      {promptState && 
      <div className={`fixed bottom-32 z-10 p-4 m-4 rounded-2xl flex flex-row justify-center items-center ${promptState.success ? 'border-green-600 border-4 bg-green-200' : 'border-red-600 border-4 bg-red-200'}`}>
        <p className={`text-lg font-medium ${promptState.success ? 'text-green-600' : 'text-red-600'}`}>
          {promptState.message}
        </p>
        <button 
          onClick={() => setPromptState(null)}
          className={`relative left-3 bottom-4 px-1 m-2 rounded-3xl bg-white bg-opacity-70 hover:scale-110 transition-transform ${promptState.success ? 'text-green-600' : 'text-red-600'}`}
        >
          ✕
        </button>
      </div>}
      <button 
        onClick={handleCreateModeButton}
        className='p-2 m-12 bg-blue-200 rounded active:bg-blue-100 hover:scale-105 transition-all'
      >
        {(interfaceMode !== 'create') ? 'Create New Post' : 'Back to Current Posts'}
      </button>
      {(interfaceMode === 'create') && 
      <div className='mb-12'>
        <UpdateBlogForm 
          publicUploadApiKey={publicUploadApiKey}
          publicUploadUrl={publicUploadUrl}
          createSignature={createSignature}
          createInDb={createBlogPost} 
          setPromptState={setPromptState}
        />
      </div>}
      {(interfaceMode !== 'create') && 
      <div className='py-4 border-t-2 border-black flex flex-col justify-start items-center'>
        <p className='mb-4 text-xl font-medium'>Current blog posts:</p>
        <div className='flex flex-row justify-start items-start flex-wrap'>
          {allBlogPosts.map(post => 
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
              {((interfaceMode === 'delete') && (post.id === postToDeleteId)) 
              ? <div className='p-2 mt-4 rounded-2xl border-red-600 border-4'>
                <p className='font-medium mx-4 text-red-600'>
                  Delete this post?
                </p>
                {!postIsBeingDeleted && 
                <button 
                  onClick={handleCancelDeleteButton}
                  className='p-2 m-4 bg-blue-200 rounded hover:scale-105 transition-transform'
                >
                  Cancel
                </button>}
                <button 
                  onClick={handleDeletePostButton}
                  className='p-2 m-4 bg-red-400 rounded hover:scale-105 transition-transform'
                >
                  {postIsBeingDeleted ? 'Deleting...' : 'Delete'}
                </button>
              </div>
              : <button 
                onClick={() => handleDeleteModeButton(post.id)}
                className='p-2 m-4 bg-blue-200 rounded active:bg-blue-100 hover:scale-105 transition-all'
              >
                Delete
              </button>}
            </div>
          </div>)}
        </div>
      </div>}
    </div>
  );
};

export default UpdateBlogInterface;