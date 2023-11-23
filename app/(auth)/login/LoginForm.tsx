'use client';

// Import necessary modules and styles
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

  return (
    <div className="flex h-screen overflow-hidden bg-white">
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
      <div className="w-1/2 flex items-center justify-center overflow-hidden">
        <form
          onSubmit={async (event) => await handleRegister(event)}
          className="max-w-md p-8 bg-green-100 rounded-md shadow-md overflow-hidden"
        >
          {/* Increased padding for a larger form */}
          <div className="mb-6">
            {/* Increased margin bottom */}
            <label className="block text-green-700 text-sm font-bold mb-2">
              {' '}
              {/* Set text color to white */}
              Username:
              <input
                type="text"
                className="w-full mt-1 p-3 border rounded-md bg-white" // Set the input background to white
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </label>
          </div>

          <div className="mb-6">
            {/* Increased margin bottom */}
            <label className="block text-green-700 text-sm font-bold mb-2">
              {' '}
              {/* Set text color to white */}
              Password:
              <input
                type="password"
                className="w-full mt-1 p-3 border rounded-md bg-white" // Set the input background to white
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>
          </div>

          <button className="w-full mt-6 p-3 bg-yellow-500 text-black rounded-md hover:bg-green-600">
            {/* Increased padding for a larger button */}
            Login
          </button>

          {errors.map((error) => (
            <div className="text-red-500 mt-4" key={`error-${error.message}`}>
              {/* Increased margin top */}
              Error: {error.message}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
