// import './globals.scss';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../database/users';
import LogoutButton from './(auth)/logout/LogoutButton';

// import CookieBanner from './CookieBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: { default: 'Home page | UpLeveled', template: '%s | UpLeveled' },
  description: 'Generated by create next app',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout(props: Props) {
  // Task: Display the logged in user's username in the navigation bar and hide the login and register links depending on whether the user is logged in or not
  // 1. Checking if the sessionToken cookie exists
  // 2. Get the current logged in user from the database using the sessionToken value
  // 3. Make decision whether to show the login and register links or not

  // 1. Checking if the sessionToken cookie exists
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <CookieBanner /> */}
        <nav>
          <div>
            {/* This is not optimized */}
            {/* <a href="/">Home</a> */}
            {/* This is optimized */}
            <Link href="/">Home</Link>
            <Link href="/top10">Top 10 Places</Link>
            <Link href="/maps">Maps</Link>
          </div>

          <div>
            {user ? (
              <>
                <div>{user.username}</div>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/register">Register</Link>
                <Link href="/login">Login</Link>
              </>
            )}
          </div>
        </nav>

        {props.children}
      </body>
    </html>
  );
}