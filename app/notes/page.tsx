import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserNoteBySessionToken,
} from '../../database/users';
import CreateNoteForm from './CreateNotesForm';

export default async function NotesPage() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/notes');

  // Display the notes for the current logged in user
  const userNote = await getUserNoteBySessionToken(sessionTokenCookie.value);

  console.log('Checking: ', userNote);

  return (
    <div>
      <CreateNoteForm userId={user.id} />

      <br />
      <br />
      <br />
      <div>
        {userNote.length > 0 ? (
          <>
            <h2>Notes For {user.username}</h2>
            <ul>
              {userNote.map((note) => (
                <li key={`animal-div-${note.noteId}`}>{note.textContent}</li>
              ))}
            </ul>
          </>
        ) : (
          <h2> No notes yet</h2>
        )}
      </div>
    </div>
  );
}
