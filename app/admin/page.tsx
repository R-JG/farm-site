import Link from 'next/link';

const AdminPage = () => {
  return (
    <main>
      <div className='m-8 flex flex-row justify-center items-center'>
        <Link 
          href='/admin/update-news'
          className='p-2 m-4 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Update News
        </Link>
        <Link 
          href='/admin/update-shop'
          className='p-2 m-4 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Update Shop
        </Link>        
        <Link 
          href='/admin/update-blog'
          className='p-2 m-4 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Update Blog
        </Link>
      </div>
    </main>
  );
};

export default AdminPage;