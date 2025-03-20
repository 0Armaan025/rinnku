import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string; // ✅ Add accessToken here
    };
  }

  interface JWT {
    id: string;
    accessToken?: string; // ✅ Also add to JWT
  }
}
