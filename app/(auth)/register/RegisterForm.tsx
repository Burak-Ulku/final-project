'use client';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

export default function RegisterPage() {
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
    <div className="max-w-md mx-auto mt-8 p-6 bg-green-100 rounded-md shadow-md">
      <form onSubmit={async (event) => await handleRegister(event)}>
        <div className="mb-4">
          <label className="block text-green-700 text-sm font-bold mb-2">
            Username:
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md"
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-green-700 text-sm font-bold mb-2">
            Email:
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded-md"
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-green-700 text-sm font-bold mb-2">
            First Name:
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md"
              onChange={(event) => setFirstname(event.currentTarget.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-green-700 text-sm font-bold mb-2">
            Last Name:
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md"
              onChange={(event) => setLastname(event.currentTarget.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-green-700 text-sm font-bold mb-2">
            Password:
            <input
              type="password"
              className="w-full mt-1 p-2 border rounded-md"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>
        </div>
        <button className="w-full mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Register
        </button>
        {errors.map((error) => (
          <div className="text-red-500 mt-2" key={`error-${error.message}`}>
            Error: {error.message}
          </div>
        ))}
      </form>
    </div>
  );
}
