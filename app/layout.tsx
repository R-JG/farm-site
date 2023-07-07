import './globals.css';
import { Open_Sans } from 'next/font/google';
import Header from '@/components/Header';

const inter = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Coyote Song Farm & Forest',
  description: 'At Coyote Song Farm & Forest we grow produce & flowers with focused attention to building living soil'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-100`}>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;