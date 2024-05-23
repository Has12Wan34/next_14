'use client'

import { NextPage } from "next";
import { FormEventHandler, useState } from "react";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";

interface Props {};

const SignIn: NextPage = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ email: '', password: ''});
  const handleSubmit = async () => {
    // e.preventDefault();
    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false
    });
    console.log(res?.status)
  }
  
return <div className="sign-in-form">
    {/* <form onSubmit={handleSubmit}> */}
      <h1>Login</h1>
      <input value={userInfo.email} onChange={({ target}) => setUserInfo({ ...userInfo, email: target.value })} type="email" placeholder="john@email.com" />
      <input value={userInfo.password} onChange={({ target}) => setUserInfo({ ...userInfo, password: target.value })} type="password" placeholder="****" />
      <button type="button" onClick={handleSubmit}>Login</button>
    {/* </form> */}
  </div>
}
export default SignIn;