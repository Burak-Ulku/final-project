import { cache } from 'react';
import { sql } from '../database/connect';
import { User } from '../migrations/00000-createTableUsers';

export const createUser = cache(
  async (
    username: string,
    passwordHash: string,
    email: string,
    first_name: string,
    last_name: string,
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (
          username,
          passwordHash,
          email,
          first_name,
          last_name
        )
      VALUES
        (
          ${username.toLowerCase()},
          ${email},
          ${first_name},
          ${last_name}
        ) RETURNING id,
        username
    `;
    return user;
  },
);
