import { cache } from 'react';
import { sql } from '../database/connect';
import { User } from '../migrations/00000-createTableUsers';

export type UserNote = {
  noteId: number;
  textContent: string;
  username: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const createUser = cache(
  async (
    username: string,
    email: string,
    firstname: string,
    lastname: string,
    passwordHash: string,
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (
          username,
          email,
          firstname,
          lastname,
          password_hash
        )
      VALUES
        (
          ${username.toLowerCase()},
          ${email},
          ${firstname},
          ${lastname},
          ${passwordHash}
        ) RETURNING id,
        username
    `;
    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;
  return user;
});

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        *
      FROM
        users
      WHERE
        username = ${username.toLowerCase()}
    `;
    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.username
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${token}
        AND sessions.user_id = users.id
        AND sessions.expiry_timestamp > now ()
      )
  `;
  return user;
});

export const getUserNoteBySessionToken = cache(async (token: string) => {
  const notes = await sql<UserNote[]>`
    SELECT
      notes.id AS note_id,
      notes.text_content AS text_content,
      users.username AS username
    FROM
      notes
      INNER JOIN users ON notes.user_id = users.id
      INNER JOIN sessions ON (
        sessions.token = ${token}
        AND sessions.user_id = users.id
        AND sessions.expiry_timestamp > now ()
      )
  `;
  return notes;
});
