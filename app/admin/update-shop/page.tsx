import Link from 'next/link';

const UpdateShopPage = () => {
  return (
    <main>
      <div className='m-8 flex flex-row justify-center items-center'>
        <Link 
          href='/admin/update-shop/create'
          className='p-2 m-4 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Create a Shop Post
        </Link>
        <Link 
          href='/admin/update-shop/edit'
          className='p-2 m-4 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Edit a Shop Post
        </Link>        
        <Link 
          href='/admin/update-shop/delete'
          className='p-2 m-4 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Delete a Shop Post
        </Link>
      </div>
    </main>
  );
};

export default UpdateShopPage;