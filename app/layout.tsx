import './globals.css';
import { Metadata } from 'next';
import { Jost } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const font = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Coyote Song Farm & Forest',
  description: 'At Coyote Song Farm & Forest we grow produce & flowers with focused attention to building living soil.',
  openGraph: {
    type: 'website',
    url: 'https://www.coyotesong.ca',
    title: 'Coyote Song Farm & Forest',
    description: 'At Coyote Song Farm & Forest we grow produce & flowers with focused attention to building living soil.',
    images: [{ url: 'https://res.cloudinary.com/dsvixs5p2/image/upload/farm-site/opengraph' }]
  }
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${font.className} min-h-screen bg-[#e6eff7] flex flex-col justify-between overflow-x-hidden overflow-y-scroll`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;