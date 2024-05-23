'use client'

import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignIn() {
  const { data: session } = useSession<any | null>();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
