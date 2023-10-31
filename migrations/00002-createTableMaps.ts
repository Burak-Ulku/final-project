import { Sql } from 'postgres';

export type Map = {
  mapId: number;
  lattitude: number;
  longitude: number;
  userId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      maps (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        latitude POINT NOT NULL,
        longitude POINT NOT NULL,
        userId INTEGER NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE maps `;
}
