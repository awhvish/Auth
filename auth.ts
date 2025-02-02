import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "./lib/db";
import { getUserById } from "./lib/user";
import { UserRole } from "@prisma/client";

export const { handlers: 
    {GET, POST}, 
    auth, 
    signIn,
    signOut,
    } = NextAuth({
    pages: {
        error: "/auth/error",
        signIn: "/auth/signin"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async signIn ({ user, account }) {
            if (account?.provider!== "credentials") return true;
            let existingUser: any;
            if (user.id) existingUser = await getUserById(user.id);
             
            //prevent signin without email verification
            if (!existingUser?.emailVerified){
                return false;
            } //add 2fa check
            
            return true;    
        },
        async session({ token, session }){
            if (token.sub && session.user){
                session.user.id = token.sub;
            }
            if (token.role && session.user){
                session.user.role = token.role as UserRole;
            }

            return session;
        },
        async jwt({token}) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            token.role = existingUser.role;
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt" },
    ...authConfig,
});