import Link from 'next/link';

const UpdateNewsPage = () => {
  return (
    <main>
      <div className='m-8 flex flex-row justify-center items-center'>
        <Link 
          href='/admin/update-news/create'
          className='p-2 m-4 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Create a News Post
        </Link>
        <Link 
          href='/admin/update-news/edit'
          className='p-2 m-4 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Edit a News Post
        </Link>        
        <Link 
          href='/admin/update-news/delete'
          className='p-2 m-4 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Delete a News Post
        </Link>
      </div>
    </main>
  );
};

export default UpdateNewsPage;