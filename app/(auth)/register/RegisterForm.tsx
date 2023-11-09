'use client';
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
    <div>
      <form onSubmit={async (event) => await handleRegister(event)}>
        <label>
          Username:
          <input onChange={(event) => setUsername(event.currentTarget.value)} />
        </label>
        <label>
          Email:
          <input onChange={(event) => setEmail(event.currentTarget.value)} />
        </label>
        <label>
          First Name:
          <input
            onChange={(event) => setFirstname(event.currentTarget.value)}
          />
        </label>
        <label>
          Last Name:
          <input onChange={(event) => setLastname(event.currentTarget.value)} />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button>Register</button>
        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            Error: {error.message}
          </div>
        ))}
      </form>
    </div>
  );
}
