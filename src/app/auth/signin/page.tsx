'use client'

import { NextPage } from "next";
import { useState } from "react";
import { signIn, useSession } from 'next-auth/react';
import { redirect } from "next/navigation";

export default function SignIn() {

  const [userInfo, setUserInfo] = useState({ email: '', password: ''});
  const { data: session } = useSession<any | null>();

  if(session){
    redirect('/')
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    await signIn('credentials', {
      email: userInfo?.email,
      password: userInfo?.password,
      callbackUrl: '/'
    });
  }
  
  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="card h-100 p-3" style={{ width : '50%' }}>
        <h1>Login</h1>
        <form className="d-grid gap-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" value={userInfo?.email} onChange={({ target}) => setUserInfo({ ...userInfo, email: target.value })}/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" value={userInfo?.password} onChange={({ target}) => setUserInfo({ ...userInfo, password: target.value })}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
          <button type="button" className="btn btn-warning"
            onClick={() => signIn("google", { 
              callbackUrl: 'http://localhost:3000/api/auth/callback/google' 
            })}
          >
            Continue with Google
          </button>
          <button type="button" className="btn btn-dark"
            onClick={() => signIn("github", { 
              callbackUrl: 'http://localhost:3000/api/auth/callback/github' 
            })}
          >
            Continue with Githup
          </button>
      </div>
    </div>
  )
}