import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      login: string;
      role: "ADMIN" | "WAREHOUSE_MANAGER" | "DEALER";
      dealerId: string | null;
      dealerName: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    login: string;
    role: "ADMIN" | "WAREHOUSE_MANAGER" | "DEALER";
    dealerId: string | null;
    dealerName: string | null;
  }
}
