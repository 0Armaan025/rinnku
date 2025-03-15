import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/app/lib/mongodb";
import User from "@/app/lib/models/user";
import dbConnect from "@/app/lib/dbConnect";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await dbConnect(); // Ensure DB is connected

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // 🆕 Create a new user in your schema format
        await User.create({
          name: user.name,
          email: user.email,
          password: null, // No password for Google users
          googleId: user.id,
          avatar: user.image,
          qrCode: null,
          rinnkuUrl: null,
          theme: "light",
          promoCodeApplied: null,
          isPremium: false,
          links: [],
          refreshToken: null,
          logs: [],
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id?.toString();
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user = { ...session.user, id: token.id } as { id: string };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
