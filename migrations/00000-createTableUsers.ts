import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(80) NOT NULL UNIQUE,
        email VARCHAR(80) NOT NULL UNIQUE,
        firstname VARCHAR(80) NOT NULL,
        lastname VARCHAR(80) NOT NULL,
        passwordHash VARCHAR(80) NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}
