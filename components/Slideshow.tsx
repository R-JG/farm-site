import { prisma } from '@/prisma/database';
import SlideshowInterface from './SlideshowInterface';
import SlideshowPost from './SlideshowPost';

const Slideshow = async () => {

  const allPosts = await prisma.homePost.findMany(
    { orderBy: { createdAt: 'asc' } }
  );

  const postViewportWidth = 90;
  const postWidthStyle = `${postViewportWidth}vw`;

  return (
    <div 
      style={{ width: postWidthStyle }} 
      className='relative m-9 bg-blue-200 bg-opacity-50 rounded-2xl overflow-hidden shadow-md'
    >
      <SlideshowInterface 
        postAmount={allPosts.length}
        postViewportWidth={postViewportWidth}
      >
        <div className='w-max flex flex-row justify-start items-start'>
          {allPosts.map(post => 
          <div 
            key={post.id}
            style={{ width: postWidthStyle }}
          >
            <SlideshowPost postData={post} />
          </div>)}
        </div>
      </SlideshowInterface>
    </div>
  );
};

export default Slideshow;