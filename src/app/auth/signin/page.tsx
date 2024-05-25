'use client'

import { NextPage } from "next";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {

  const [userInfo, setUserInfo] = useState({ email: '', password: ''});

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
      </div>
    </div>
  )
}