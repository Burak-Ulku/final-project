'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CreateNoteForm({ userId }: { userId: number }) {
  const [textContent, setTextContent] = useState('');
  const [noteCount, setNoteCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchNoteCount = async () => {
      const response = await fetch('/api/notes/count');
      const data = await response.json();
      setNoteCount(data.count);
    };

    fetchNoteCount();
  }, [noteCount]);

  async function handleCreateNote() {
    await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({
        textContent,
        userId,
      }),
    });
    router.refresh();
    setTextContent('');
    setNoteCount((prevCount) => prevCount + 1);
  }

  return (
    <form
      className="max-w-md mx-auto mt-8 bg-white p-6 rounded-md shadow-md"
      onSubmit={async (event) => {
        event.preventDefault();
        await handleCreateNote();
      }}
    >
      <label className="block text-gray-700 text-xl font-semibold mb-4">
        Add Note ({noteCount} created):
      </label>
      <input
        className="w-full px-4 py-2 border rounded-md text-lg focus:outline-none focus:border-blue-500"
        value={textContent}
        onChange={(event) => setTextContent(event.currentTarget.value)}
      />
      <div className="mt-8 text-center">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
          type="submit"
        >
          Create +
        </button>
      </div>
    </form>
  );
}
