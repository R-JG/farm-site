import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { getUserByEmail } from '@/lib/database';
import Provider from '@/components/Provider';
import AdminHeader from '@/components/AdminHeader';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {

  const session = await getServerSession(options);

  if (!session || !session.user || !session.user.email) {
    if (session && session.user && !session.user.email) console.error('User\'s email is undefined');
    return redirect('/api/auth/signin?callbackUrl=/admin');
  };

  const userData = await getUserByEmail(session.user.email);

  if (userData?.role !== 'ADMIN') {
    return <div><h1>{`User ${userData?.name} is not an admin`}</h1></div>;
  };

  return (
    <div className='flex-grow flex flex-col justify-start items-center'>
      <AdminHeader />
      <Provider>
        {children}
      </Provider>
    </div>
  );
};

export default AdminLayout;