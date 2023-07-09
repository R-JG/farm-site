import Image from 'next/image';

type Props = {
  importedImage: any,
  alt: string, 
  href: string
};

const IconLink = ({ importedImage, alt, href }: Props) => {
  return (
    <a 
      href={href} 
      target='_blank'
      className='w-fit h-fit'
    >
      <Image 
        src={importedImage} 
        alt={alt} 
        className=' w-12 aspect-square'
      />
    </a>
  );
};

export default IconLink;