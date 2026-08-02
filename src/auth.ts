import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user" },
        password: { label: "Password", type: "password", placeholder: "user" },
      },
      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;

        if (username === "user" && password === "user") {
          return {
            id: "rove-user-1",
            name: "Valued Client",
            email: "user@roveconcepts.com",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
          };
        }

        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET || "rove-concepts-luxury-auth-secret-key-9988",
  session: {
    strategy: "jwt",
  },
  trustHost: true,
});
