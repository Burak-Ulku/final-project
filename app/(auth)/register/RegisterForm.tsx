'use client';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import Link from 'next/link';
// Import necessary modules and styles
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Logo from '../../../public/images/logo.png';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

type Props = { returnTo?: string | string[] };

export default function RegisterPage(props: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        firstname,
        lastname,
        password,
      }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/profile/${data.user.username}`);

    router.refresh();
  }

  return (
    <div className="flex h-[88vh] overflow-hidden bg-white">
      {/* Left side - Registration Form with Logo */}
      <div className="w-1/2 flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-8">
            <Link href="/">
              <div className="cursor-pointer">
                {/* Increase logo size and move it up */}
                <Image src={Logo} alt="Logo" width={200} height={120} />
              </div>
            </Link>
          </div>

          <form
            onSubmit={handleRegister}
            className="max-w-md p-8 bg-green-100 rounded-md shadow-md overflow-hidden"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              Register Form
            </h2>

            <div className="mb-6">
              <label className="block text-green-700 text-sm font-bold mb-2">
                Username:
                <input
                  type="text"
                  className="w-full mt-1 p-3 border rounded-md"
                  onChange={(event) => setUsername(event.currentTarget.value)}
                />
              </label>
            </div>

            <div className="mb-6">
              <label className="block text-green-700 text-sm font-bold mb-2">
                Email:
                <input
                  type="email"
                  className="w-full mt-1 p-3 border rounded-md"
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </label>
            </div>

            <div className="mb-6">
              <label className="block text-green-700 text-sm font-bold mb-2">
                First Name:
                <input
                  type="text"
                  className="w-full mt-1 p-3 border rounded-md"
                  onChange={(event) => setFirstname(event.currentTarget.value)}
                />
              </label>
            </div>

            <div className="mb-6">
              <label className="block text-green-700 text-sm font-bold mb-2">
                Last Name:
                <input
                  type="text"
                  className="w-full mt-1 p-3 border rounded-md"
                  onChange={(event) => setLastname(event.currentTarget.value)}
                />
              </label>
            </div>

            <div className="mb-6">
              <label className="block text-green-700 text-sm font-bold mb-2">
                Password:
                <input
                  type="password"
                  className="w-full mt-1 p-3 border rounded-md"
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
              </label>
            </div>

            <button className="w-full mt-6 p-3 bg-green-500 text-white rounded-md hover:bg-green-600">
              Register
            </button>

            {errors.map((error) => (
              <div className="text-red-500 mt-4" key={`error-${error.message}`}>
                Error: {error.message}
              </div>
            ))}
          </form>
        </div>
      </div>

      {/* Right side - Photo */}
      <div className="w-1/2 overflow-hidden">
        {/* Add your photo component here */}
        <img
          src="https://images.pexels.com/photos/14384753/pexels-photo-14384753.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Your Photo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
