import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken? : string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string; // ✅ Add accessToken here
    };
  }

}



declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
  }
}