import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "text" }
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        try {
            const response = await fetch("http://localhost:5000/api/user/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            }) as any;
            const res = await response.json();

          if (response.status === 200 || response.status === 201) {
            return res;
          } else {
            return null;
          }
        } catch (error) {
            console.error('Error during API login:', error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: { user:any, account:any, profile?:any, email?:any, credentials?:any}) {
      return true
    },
    async jwt({ token, user, account, profile } : { token: any, user: any, account:any, profile?:any }) {
      if (account?.provider === "github") {
        token.accessToken = account.access_token;
        token.user = { 
          email: user.email, 
          fname: user.name };
      }else if (account?.provider === "google") {
        token.accessToken = account.access_token;
        token.user = { 
          email: profile.email, 
          fname: profile.given_name, 
          lname: profile.family_name };
      }else if (user) {
        const { email, fname, lname } = user.user;
        token.accessToken = user.user.token;
        token.user = { email, fname, lname };
      }
      return token;
    },
    async session({ session, token } : { session: any, token: any }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    }
  }
});

export { handler as GET, handler as POST };
