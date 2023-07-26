'use client';

import { useState } from 'react';
import { ShopItem } from '@/utils/types';
import UpdateShopForm from './UpdateShopForm';

type Props = {
  publicUploadApiKey: string,
  publicUploadUrl: string, 
  allShopItems: ShopItem[],
  createSignature: () => Promise<null | { timestamp: number, signature: string }>,
  createShopItem: (itemRequestData: FormData) => Promise<{ success: boolean }>,
  deleteShopItem: (itemId: string) => Promise<{ success: boolean }>
};

const UpdateShopInterface = ({ 
  publicUploadApiKey,
  publicUploadUrl,
  allShopItems,
  createSignature,
  createShopItem,
  deleteShopItem
  }: Props) => {
  
  const [interfaceMode, setInterfaceMode] = useState<'create' | 'edit' | 'delete' | 'none'>('none');
  const [promptState, setPromptState] = useState<{ message: string, success: boolean } | null>(null);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  const [itemIsBeingDeleted, setItemIsBeingDeleted] = useState<boolean>(false);

  const handleCreateModeButton = (): void => {
    (interfaceMode !== 'create') ? setInterfaceMode('create') : setInterfaceMode('none')
  };

  const handleDeleteModeButton = (itemId: string): void => {
    if (itemIsBeingDeleted) return;
    setInterfaceMode('delete');
    setItemToDeleteId(itemId);
  };

  const handleCancelDeleteButton = (): void => {
    setInterfaceMode('none');
    setItemToDeleteId(null);
  };

  const handleDeleteItemButton = async (): Promise<void> => {
    if (!itemToDeleteId || itemIsBeingDeleted) return;
    setItemIsBeingDeleted(true);
    try {
      const response = await deleteShopItem(itemToDeleteId);
      if (response.success) {
        setPromptState({ message: 'Successfully deleted the item', success: true });
      } else {
        throw new Error('Server Error');
      };
    } catch (error) {
      console.error(error);
      setPromptState({ message: 'There was an error in deleting the item', success: false });
    } finally {
      setItemToDeleteId(null);
      setInterfaceMode('none');
      setItemIsBeingDeleted(false);
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
        {(interfaceMode !== 'create') ? 'Create New Item' : 'Back to Current Items'}
      </button>
      {(interfaceMode === 'create') && 
      <div className='mb-12'>
        <UpdateShopForm 
          publicUploadApiKey={publicUploadApiKey}
          publicUploadUrl={publicUploadUrl}
          createSignature={createSignature}
          createInDb={createShopItem} 
          setPromptState={setPromptState}
        />
      </div>}
      {(interfaceMode !== 'create') && 
      <div className='py-4 border-t-2 border-black flex flex-col justify-start items-center'>
        <p className='mb-4 text-xl font-medium underline'>Current items on the shop page:</p>
        <div className='flex flex-row justify-start items-start flex-wrap'>
          {allShopItems.map(item => 
          <div 
            key={item.id}
            className=' max-w-sm p-4 m-4 border-black border-2 rounded-2xl'
          >
            <div>
              <h1 className='text-lg font-medium mb-2'>
                {item.name}
              </h1>
              <p className=' line-clamp-3'>
                {item.description}
              </p>
            </div>
            <div className='flex flex-row justify-center items-center'>
              {((interfaceMode === 'delete') && (item.id === itemToDeleteId)) 
              ? <div className='p-2 mt-4 rounded-2xl border-red-600 border-4'>
                <p className='font-medium mx-4 text-red-600'>
                  Delete this item?
                </p>
                {!itemIsBeingDeleted && 
                <button 
                  onClick={handleCancelDeleteButton}
                  className='p-2 m-4 bg-blue-200 rounded hover:scale-105 transition-transform'
                >
                  Cancel
                </button>}
                <button 
                  onClick={handleDeleteItemButton}
                  className='p-2 m-4 bg-red-400 rounded hover:scale-105 transition-transform'
                >
                  {itemIsBeingDeleted ? 'Deleting...' : 'Delete'}
                </button>
              </div>
              : <button 
                onClick={() => handleDeleteModeButton(item.id)}
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

export default UpdateShopInterface;