import {DefaultSession, getServerSession, NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {authToken, Axios} from "@/utils/axios";
import {GetServerSidePropsContext} from "next";

type UserSession = {
  id: string;
  name: string;
  username: string;
  role: "admin" | "operator" | "siswa";
  token: string;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: UserSession
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "enter username..."
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "enter password..."
        }
      },
      async authorize(credentials) {
        const res = await Axios.post("/auth/login", {
          username: credentials?.username,
          password: credentials?.password
        })

        const {data: user} = res.data as {
          message: string,
          data: {
            token: string,
            id: number
            name: string,
            username: string,
            address: string,
            phone_number: string,
            role: string
          }
        }

        if(!user) return null;

        return {
          ...user,
          id: String(user.id)
        }
      }
    })
  ],
  session: {
    maxAge: 60 * 60
  },
  pages: {
    signIn: "/login"
  },
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      // @ts-ignore Gapapa
      if(token && session.user){
        session.user = token as any
      }
      return session;
    },
  },
}

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  const auth = await getServerSession(ctx.req, ctx.res, authOptions);

  if (auth) {
    const conf = authToken(auth.user.token);
    console.log(conf)
  }

  return auth;
};
