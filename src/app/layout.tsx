'use client'

import { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";

interface RootLayoutProps {
  children: ReactNode;
  session: any; // ใช้ประเภทที่เหมาะสมสำหรับ session ของคุณ
}

const RootLayout = ({ children, session }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
