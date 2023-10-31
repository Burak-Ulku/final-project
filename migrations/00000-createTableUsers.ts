import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  passwordHash: string;
  email: string;
  firstName: string;
  lastName: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(80) NOT NULL UNIQUE,
        passwordHash VARCHAR(80) NOT NULL,
        email VARCHAR(80) NOT NULL UNIQUE,
        firstName VARCHAR(80) NOT NULL,
        lastName VARCHAR(80) NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}