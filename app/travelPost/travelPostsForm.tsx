'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../util/validation';
import { TravelPostsResponseBodyPost } from '../api/travelPosts/route';

type Props = { returnTo?: string | string[] };

// Import your CSS file if you have a separate one
// import './TravelPostsForm.module.css'; // If using a separate CSS module file

// Rest of your imports...

export default function TravelPostsForm(props: Props) {
  const [imageUrl, setImageUrl] = useState('');
  const [adress, setAdress] = useState('');
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [place, setPlace] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/travelPosts', {
      method: 'POST',
      body: JSON.stringify({
        imageUrl,
        adress,
        place,
      }),
    });

    const travelPostData: TravelPostsResponseBodyPost = await response.json();

    if ('errors' in travelPostData) {
      setErrors(travelPostData.errors);
      return;
    }

    router.push(
      getSafeReturnToPath(props.returnTo) ||
        `/profile/${travelPostData.travelPost.placeName}`,
    );

    router.refresh();
  }

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white border rounded-md shadow-md"
      onSubmit={async (event) => await handleRegister(event)}
    >
      <label className="block mb-2">
        ImageUrl:
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(event) => setImageUrl(event.currentTarget.value)}
        />
      </label>
      <label className="block mb-2">
        Adress:
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(event) => setAdress(event.currentTarget.value)}
        />
      </label>
      <label className="block mb-4">
        Place:
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(event) => setPlace(event.currentTarget.value)}
        />
      </label>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
        type="submit"
      >
        Upload
      </button>

      {errors.map((error) => (
        <div className="text-red-500 mt-2" key={`error-${error.message}`}>
          Error: {error.message}
        </div>
      ))}
    </form>
  );
}
