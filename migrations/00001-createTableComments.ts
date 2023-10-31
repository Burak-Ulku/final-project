import { Sql } from 'postgres';

export type Comment = {
  commentId: number;
  rating: number;
  commentWriterId: number;
  commentMapId: number;
  commentText: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      comments (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        rating INTEGER NOT NULL,
        commentWriterId INTEGER NOT NULL,
        commentMapId INTEGER NOT NULL,
        commentText VARCHAR(80) NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE comments `;
}
