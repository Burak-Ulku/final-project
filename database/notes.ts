import { cache } from 'react';
import { Note } from '../migrations/00007-createTableNotes';
import { sql } from './connect';

export const createNote = cache(async (userId: number, textContent: string) => {
  const [note] = await sql<Note[]>`
    INSERT INTO
      notes (
        user_id,
        text_content
      )
    VALUES
      (
        ${userId},
        ${textContent}
      ) RETURNING *
  `;

  return note;
});
