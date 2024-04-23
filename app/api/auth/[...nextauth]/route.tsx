import NextAuth from "next-auth";
import prisma from '../../../libs/prismadb';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "johndoe@gmail.com"},
                name: { label: "Name", type: "text", placeholder: "John Doe"},
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = { id: 1, name: "John Doe", email: "johndoe@gmail.com" };
                return user;
                // const user = await prisma.user.findFirst({
                //     where: {
                //         username: credentials.username,
                //         password: credentials.password,
                //     },
                // });
                // if (user) {
                //     return user;
                // } else {
                //     return null;
                // }
            },
        }),

    ], secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST}