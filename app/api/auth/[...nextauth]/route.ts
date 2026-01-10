// File: app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // 1. Ubah kredensial dari 'email' menjadi 'username'
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 2. Cek apakah username & password yang diinput ada
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // 3. Ambil kredensial admin dari file .env
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminUsername || !adminPassword) {
            console.error("ADMIN_USERNAME atau ADMIN_PASSWORD tidak diatur di file .env");
            return null;
        }

        // 4. Cocokkan username dan password yang diinput dengan yang ada di .env
        const isValid = credentials.username === adminUsername && credentials.password === adminPassword;

        if (isValid) {
          // Jika cocok, kembalikan objek user. 'name' akan disimpan di sesi.
          return { id: "1", name: adminUsername };
        } else {
          // Jika tidak cocok, kembalikan null
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

