import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const AuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credential: any): Promise<any> {
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credential.identifier },
                            { username: credential.identifier },
                        ]
                    })
                    if (!user) {
                        throw new Error("User not found with this email")
                    }
                    if (!user.isVerified) {
                        throw new Error("Please verify your account before login")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credential.password, user.password)
                    if (!isPasswordCorrect) {
                        throw new Error("Password is incorrect")
                    } else {
                        return user
                    }
                } catch (error: any) {
                    throw new Error(error)
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
              token._id = user._id?.toString(); // Convert ObjectId to string
              token.isVerified = user.isVerified;
              token.isAcceptingMessages = user.isAcceptingMessages;
              token.username = user.username;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
            }
            return session;
        },
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
}