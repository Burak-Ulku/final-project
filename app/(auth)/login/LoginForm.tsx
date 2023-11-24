'use client';

import Image from 'next/image';
import Link from 'next/link';
// Import necessary modules and styles
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Logo from '../../../public/images/logo.png';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.username}`,
    );

    router.refresh();
  }

  // ... (Previous code)

  return (
    <div className="flex h-[88vh] overflow-hidden bg-white">
      {/* Left side - Photo */}
      <div className="w-1/2 overflow-hidden">
        {/* Add your photo component here */}
        <img
          src="https://images.pexels.com/photos/3370153/pexels-photo-3370153.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Your Photo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-1/2 flex flex-col items-center justify-center overflow-hidden">
        <div className="mb-4">
          {/* Logo linking to homepage */}
          <Link href="/">
            <div className="cursor-pointer">
              {/* Increase logo size and move it up */}
              <Image src={Logo} alt="Logo" width={200} height={120} />
            </div>
          </Link>
        </div>

        <form
          onSubmit={async (event) => await handleRegister(event)}
          className="max-w-md p-8 bg-green-100 rounded-md shadow-md overflow-hidden"
        >
          {/* Added "Login Form" heading */}
          <h2 className="text-2xl font-bold text-green-700 mb-6">Login Form</h2>

          {/* Username input */}
          <div className="mb-6">
            <label className="block text-green-700 text-sm font-bold mb-2">
              Username:
              <input
                type="text"
                className="w-full mt-1 p-3 border rounded-md bg-white"
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </label>
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label className="block text-green-700 text-sm font-bold mb-2">
              Password:
              <input
                type="password"
                className="w-full mt-1 p-3 border rounded-md bg-white"
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>
          </div>

          {/* Login button */}
          <button className="w-full mt-6 p-3 bg-green-500 text-white rounded-md hover:bg-green-600">
            Login
          </button>

          {/* Display errors */}
          {errors.map((error) => (
            <div className="text-red-500 mt-4" key={`error-${error.message}`}>
              Error: {error.message}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
