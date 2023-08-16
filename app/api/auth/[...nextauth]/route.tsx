import User from "@models/user";
import connectDB from "@utils/database";
import { DefaultUser, Session } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
interface P extends DefaultUser {
  email: string;
  picture: string;
  name: string;
}

const handle = NextAuth({
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
  ],
  secret: process.env.JWT_SECRET,

  callbacks: {
    async session({ session }: { session: Session }) {
      if (session.user) {
        const sessionUser = await User.findOne({ email: session.user.email });

        session.user.id = sessionUser._id.toString();
      }
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectDB();

        // check user exists
        const userExists = await User.findOne({ email: profile?.email });
        const name = profile?.name?.substring(0, profile?.name?.indexOf(" "));
        const image = profile?.picture ?? undefined;
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: name?.toLocaleLowerCase(),
            image: profile?.picture ?? undefined,
          });
        }
        return true;
      } catch (error: any) {
        console.log(`Error checking if user exists: ${error?.message ?? ""}`);
        return false;
      }
    },
  },
});

export { handle as DELETE, handle as GET, handle as POST, handle as PUT };
