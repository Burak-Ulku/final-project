// components/RootLayout.js
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../database/users';
import LogoutButton from './(auth)/logout/LogoutButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: { default: 'Home page | UpLeveled', template: '%s | UpLeveled' },
  description: 'Generated by create next app',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout(props: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <html lang="en">
      <body className={`font-sans ${inter.className}`}>
        <nav className="bg-blue-500 p-4 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <Link href="/" className="text-white">
                Home
              </Link>
              <Link href="/travelPost" className="text-white ml-4">
                Travelposts
              </Link>
              <Link href="/notes" className="text-white ml-4">
                Check Notes
              </Link>
            </div>

            <div>
              {user ? (
                <>
                  <div className="text-white">{user.username}</div>
                  <LogoutButton />
                </>
              ) : (
                <>
                  <Link href="/register" className="text-white ml-4">
                    Register{' '}
                  </Link>
                  <Link href="/login" className="text-white ml-4">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {props.children}
      </body>
    </html>
  );
}
