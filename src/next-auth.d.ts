// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string | null;
      fname?: string | null; 
      lname?: string | null; 
    } & DefaultSession["user"];
  }
}
