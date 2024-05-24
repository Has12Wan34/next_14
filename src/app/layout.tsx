'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";
import { signIn, signOut, useSession } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from './store';

interface RootLayoutProps {
  children: ReactNode;
  session: any; 
}

function Profile() {
  const { data: session } = useSession<any | null>();

  if (session) {
    return (
      <div className='d-flex justify-content-between w-100'>
        <p className="text-warning h4">{session?.user?.fname} {session?.user?.lname}</p>
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

const RootLayout = ({ children, session }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
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
