import './globals.css';
import { Jost } from 'next/font/google';
import Header from '@/components/Header';

const font = Jost({ subsets: ['latin'] });

export const metadata = {
  title: 'Coyote Song Farm & Forest',
  description: 'At Coyote Song Farm & Forest we grow produce & flowers with focused attention to building living soil'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${font.className} bg-blue-100 overflow-x-hidden overflow-y-scroll`}>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;