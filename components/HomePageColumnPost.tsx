import Image from 'next/image';
import Link from 'next/link';
import { HomePost } from '@/utils/types';

interface Props {
  postData: HomePost
};

const HomePageColumnPost = ({ postData }: Props) => {
  return (
    <div>
      <div>
        <h1>{postData.title}</h1>
        <p>{postData.content}</p>
        {postData.link && 
        <Link href={postData.link} />}
      </div>
      <div>
        {postData.images.map(imageSrc => 
        <Image 
          key={imageSrc}
          src={imageSrc} 
          alt=''
        />)}
      </div>
    </div>
  );
};

export default HomePageColumnPost;