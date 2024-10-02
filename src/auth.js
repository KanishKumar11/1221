import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import { connectDb } from "@/lib/connectDb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GoogleProvider],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDb();
      const existingUser = await User.findOne({ email: user.email }).lean();

      if (!existingUser) {
        const newUser = new User({
          name: user.name,
          email: user.email,
          image: user.image,
        });
        await newUser.save();
      }

      return true;
    },

    async session({ session, token }) {
      await connectDb();
      const userInDb = await User.findOne({ email: session.user.email }).lean();
      if (userInDb) {
        session.user.id = userInDb._id;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
      }
      return token;
    },
  },
});
