import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/prisma/client'
import CredentialsProvider from 'next-auth/providers/credentials'
import argon2 from 'argon2'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'E-post', type: 'text', placeholder: 'e-post'},
                password: { label: 'Lösenord', type: 'password', placeholder: 'lösenord' }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) return null
                const user = await prisma.user.findUnique({ where: { email: credentials.email }})            

            if (!user) return null
            const isPasswordValid = await argon2.verify(user.hashedPassword, credentials.password);
            return isPasswordValid ? user : null             
            }
        })
    ],
    session: {
        strategy: 'jwt'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }