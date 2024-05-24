import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  secret: 'nextauth',
  callbacks: {
    async jwt({ token, user } : { token: any, user: any}) {
      if (user) {
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
