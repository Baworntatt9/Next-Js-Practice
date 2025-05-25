import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      User_info: {
        _id: string;
        name: string;
        email: string;
        tel: string;
        password: string;
        createdAt: string;
        __v: number;
      };
      success: boolean;
      token: string;
    };
  }
}
