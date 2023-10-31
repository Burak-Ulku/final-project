import { Sql } from 'postgres';

export type Picture = {
  picturesId: number;
  pictureBlob: number;
  mapId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      pictures (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        pictureBlob BYTEA NOT NULL,
        mapId INTEGER NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE pictures `;
}
