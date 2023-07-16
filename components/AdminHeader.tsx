import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import Link from 'next/link';

const AdminHeader = async () => {

  const session = await getServerSession(options);

  if (!session || !session.user) return undefined;

  return (
    <div className='self-end text-blue-50 w-fit p-2 m-2 rounded-2xl bg-blue-400 flex flex-row justify-center items-center'>
      <h1 className='ml-2 mr-8'>
        Admin: {session.user.name}
      </h1>
      <Link 
        href='/api/auth/signout?callbackUrl=/'
        className='py-1 px-4 bg-blue-500 rounded-xl hover:scale-110 transition-transform'
      >
        Sign Out
      </Link>
    </div>
  );
};

export default AdminHeader;