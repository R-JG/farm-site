import { prisma } from '@/prisma/database';
import HomePageColumnPost from './HomePageColumnPost';

const HomePageColumn = async () => {
 
  const getAllHomePosts = async () =>  await prisma.homePost.findMany();

  const allHomePosts = await getAllHomePosts();
  
  return (
    <div>
      {allHomePosts.map(post => 
      <HomePageColumnPost 
        key={post.id}
        postData={post}
      />)}
    </div>
  );
};

export default HomePageColumn;