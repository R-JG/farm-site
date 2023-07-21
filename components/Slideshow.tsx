import { prisma } from '@/prisma/database';
import SlideshowInterface from './SlideshowInterface';
import SlideshowPost from './SlideshowPost';

const Slideshow = async () => {

  const allNewsPosts = await prisma.newsPost.findMany({ 
    orderBy: { createdAt: 'desc' },
    include: { images: true }
  });

  const postViewportWidth = 90;
  const postWidthStyle = `${postViewportWidth}vw`;

  return (
    <div 
      style={{ width: postWidthStyle }} 
      className='relative m-9 bg-blue-200 bg-opacity-50 rounded-2xl overflow-hidden shadow-md'
    >
      <SlideshowInterface 
        postAmount={allNewsPosts.length}
        postViewportWidth={postViewportWidth}
      >
        <div className='w-max flex flex-row justify-start items-start'>
          {allNewsPosts.map(post => 
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