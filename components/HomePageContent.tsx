import { prisma } from '@/prisma/database';
import HomePageSlideshow from './HomePageSlideshow';

const HomePageContent = async () => {

  const getAllHomePosts = async () =>  await prisma.homePost.findMany();

  const allHomePosts = await getAllHomePosts();

  return (
    <div className='w-full py-9 flex flex-col justify-start items-center'>
      <HomePageSlideshow posts={allHomePosts} />
    </div>
  );
};

export default HomePageContent;