'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SessionProvider } from "next-auth/react";
import { signIn, signOut, useSession } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from './store';

interface RootLayoutProps {
  children: ReactNode;
  // session: AppProps; 
};

const menu = [
  { display: 'home', path: '/' },
  { display: 'movie', path: '/movie' },
];

function Profile() {
  const { data: session } = useSession<any | null>();
  const pathname = usePathname();

  if (session) {
    return (
      <div className='d-flex justify-content-between w-100'>
        <p className="text-warning h4">{session?.user?.fname} {session?.user?.lname}</p>
          <div className='d-flex'>
            {menu.map((v, i) => (
              <div key={i} className='ms-2 align-self-center'>
                <Link 
                  href={v.path} 
                  className={`${pathname === v.path ? 'btn btn-primary btn-sm' : 'link-offset-2 link-underline link-underline-opacity-0'}`}
                >{v.display.toUpperCase()}</Link>
              </div>
            ))}
          </div>
        <button className="btn btn-warning btn-sm" onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div className='d-flex justify-content-between w-100'>
      <p className="text-warning h4">Not signed in</p>
      <button className="btn btn-warning btn-sm" onClick={() => signIn()}>Sign in</button>
    </div>
  );
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Provider store={store}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
              <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav w-100">
                    <Profile/>
                  </div>
                </div>
              </div>
            </nav>
              {children}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
