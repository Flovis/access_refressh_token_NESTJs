import NextAuth, { NextAuthOptions } from "next-auth";
import CreadentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CreadentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;

        const { email, password } = credentials;
        const res = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 401) {
          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };
