import React from 'react';
import { logout } from './action';

export default function LogoutButton() {
  return (
    <form>
      <button className="logoutButton" formAction={logout}>
        Logout{' '}
      </button>
    </form>
  );
}
