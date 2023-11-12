'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { TravelPostsResponseBodyPost } from '../../api/(auth)/travelPosts/route';

type Props = { returnTo?: string | string[] };

export default function TravelPostsForm(props: Props) {
  const [imageUrl, setImageUrl] = useState('');
  const [adress, setAdress] = useState('');
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

    // if (props.returnTo) {
    //   console.log('Check Return to: ', props.returnTo);
    //   router.push(props.returnTo);
    // }
    // console.log('Checl Return to: ', props.returTo);

    router.push(
      getSafeReturnToPath(props.returnTo) ||
        `/profile/${travelPostData.travelPost.placeName}`,
    );

    router.refresh();
  }

  return (
    <form onSubmit={async (event) => await handleRegister(event)}>
      <label>
        ImageUrl:
        <input onChange={(event) => setImageUrl(event.currentTarget.value)} />
      </label>
      <label>
        Adress:
        <input onChange={(event) => setAdress(event.currentTarget.value)} />
        <label>
          Place:
          <input onChange={(event) => setPlace(event.currentTarget.value)} />
        </label>
      </label>
      <button>Upload</button>

      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          Error: {error.message}
        </div>
      ))}
    </form>
  );
}
