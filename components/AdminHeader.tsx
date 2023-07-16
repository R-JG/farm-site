import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import Link from 'next/link';

const AdminHeader = async () => {

  const session = await getServerSession(options);

  if (!session || !session.user) return undefined;

  return (
    <div className='w-full bg-blue-400 flex flex-row justify-end items-start'>
      <h1>Admin: {session.user.name}</h1>
      <Link href='/api/auth/signout?callbackUrl=/'>
        Sign Out
      </Link>
    </div>
  );
};

export default AdminHeader;