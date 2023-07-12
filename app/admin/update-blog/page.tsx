import Link from 'next/link';

const UpdateBlogPage = () => {
  return (
    <main>
      <div className='m-8 flex flex-row justify-center items-center'>
        <Link 
          href='/admin/update-blog/create'
          className='p-2 m-4 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Create a Blog Post
        </Link>
        <Link 
          href='/admin/update-blog/edit'
          className='p-2 m-4 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Edit a Blog Post
        </Link>        
        <Link 
          href='/admin/update-blog/delete'
          className='p-2 m-4 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Delete a Blog Post
        </Link>
      </div>
    </main>
  );
};

export default UpdateBlogPage;