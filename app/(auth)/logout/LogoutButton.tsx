import 'tailwindcss/tailwind.css';
import React from 'react';
import { logout } from './action';

export default function LogoutButton() {
  return (
    <form>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        formAction={logout}
      >
        Logout
      </button>
    </form>
  );
}
