import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginForm, User } from "@/models/User";

export const authOptions: NextAuthOptions = {
    secret: process.env.SECRET ?? "",
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "test@hotmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Validation logic
                const response = await fetch(process.env.NEXT_PUBLIC_API_PREFIX + '/account/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                })

                // Fail login
                if (!response.ok) {
                    throw new Error(await response.text());
                }

                // Success login, return user
                const user: User = await response.json();      
                           
                return user;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === 'update') {
                return {...token, ...session};
            }
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {            
            session.user = token.user!;
            return session;
        }
      },
    
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }