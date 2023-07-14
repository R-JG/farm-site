import { prisma } from '@/prisma/database';
import HomePageColumnPost from './HomePageColumnPost';

const HomePageColumn = async () => {

  const allNewsPosts = await prisma.newsPost.findMany();
  
  return (
    <div className='w-full p-7 flex flex-col justify-start items-center'>
      {allNewsPosts.map((post, index) => 
      <HomePageColumnPost 
        key={post.id}
        postData={post}
        position={index % 2}
      />)}
    </div>
  );
};

export default HomePageColumn;