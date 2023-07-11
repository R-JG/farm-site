import { prisma } from '@/prisma/database';
import HomePageColumnPost from './HomePageColumnPost';

const HomePageColumn = async () => {
 
  const getAllHomePosts = async () =>  await prisma.homePost.findMany();

  const allHomePosts = await getAllHomePosts();
  
  return (
    <div className='w-full p-7 flex flex-col justify-start items-center'>
      {allHomePosts.map((post, index) => 
      <HomePageColumnPost 
        key={post.id}
        postData={post}
        position={index % 2}
      />)}
    </div>
  );
};

export default HomePageColumn;