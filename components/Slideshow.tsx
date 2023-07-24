import SlideshowInterface from './SlideshowInterface';
import SlideshowPost from './SlideshowPost';
import { NewsPost } from '@/utils/types';

type Props = {
  allNewsPosts: NewsPost[]
};

const Slideshow = async ({ allNewsPosts }: Props) => {

  const postViewportWidth = 100;
  const postWidthStyle = `${postViewportWidth}vw`;

  return (
    <div 
      style={{ width: postWidthStyle }} 
      className='relative bg-blue-100 overflow-hidden shadow-md'
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