'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: ReactNode
};

const Provider = ({ children }: Props) => <SessionProvider>{children}</SessionProvider>;

export default Provider;