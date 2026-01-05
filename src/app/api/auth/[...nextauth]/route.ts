


import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          // ✅ استبدال الرابط الثابت بمتغير البيئة
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
            email: credentials.email,
            password: credentials.password,
          });

          // هنا نرجع اليوزر مع التوكن اللي جاي من الـ API
          if (data.message === "success") {
            return { ...data.user, token: data.token };
          }
          return null;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.userToken = user.token;
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.token = token.userToken; // الآن التوكن متاح في كل الموقع
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };