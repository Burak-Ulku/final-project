import { Sql } from 'postgres';

export type Travelpost = {
  id: number;
  userId: number;
  imageUrl: string;
  adress: string;
  placeName: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      travel_posts (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        image_url VARCHAR(200) NOT NULL,
        adress VARCHAR(80) NOT NULL,
        place_name VARCHAR(80) NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE travelposts `;
}
