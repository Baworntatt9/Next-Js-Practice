import "./globals.css";
import MainHeader from "@/components/main-header/main-header";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the session on the server side
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <NextAuthProvider session={session}>
          <MainHeader />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
