'use client';

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

    // if (props.returnTo) {
    //   console.log('Check Return to: ', props.returnTo);
    //   router.push(props.returnTo);
    // }
    // console.log('Checl Return to: ', props.returTo);

    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.username}`,
    );

    router.refresh();
  }

  return (
    <form
      onSubmit={async (event) => await handleRegister(event)}
      className="max-w-md mx-auto mt-8 p-6 bg-green-100 rounded-md shadow-md"
    >
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
          Password:
          <input
            type="password"
            className="w-full mt-1 p-2 border rounded-md"
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
      </div>
      <button className="w-full mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Login
      </button>

      {errors.map((error) => (
        <div className="text-red-500 mt-2" key={`error-${error.message}`}>
          Error: {error.message}
        </div>
      ))}
    </form>
  );
}
