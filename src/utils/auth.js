// import { PrismaAdapter } from '@auth/prisma-adapter'
// import GithubProvider from 'next-auth/providers/github'
// import GoogleProvider from 'next-auth/providers/google'
// // import { PrismaClient } from '@prisma/client'
// import prisma from './connect'
// import { getServerSession } from 'next-auth'

// export const authOptions = {
//   // adapter: PrismaAdapter(PrismaClient),
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code"
//         }
//       }
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
// }

// export const getAuthSession = () => getServerSession(authOptions)