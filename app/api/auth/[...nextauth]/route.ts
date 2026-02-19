import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Simple password validation for initial setup
        // In production, you should use proper authentication with hashed passwords
        const validEmails = [
          'sasha@hustledigitalagency.com',
          'mikayla@hustledigitalagency.com'
        ];

        if (!validEmails.includes(credentials.email)) {
          return null;
        }

        // For now, accept any password (you should change this!)
        // TODO: Implement proper password hashing with bcrypt
        const user = {
          id: credentials.email,
          email: credentials.email,
          name: credentials.email.split('@')[0],
          role: credentials.email.includes('sasha') ? 'admin' : 'user'
        };

        return user;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };