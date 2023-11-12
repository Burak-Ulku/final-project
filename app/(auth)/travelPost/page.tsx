import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import TravelPostsForm from './travelPostsForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function TravelPostPage({ searchParams }: Props) {
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (session) redirect('/');

  return (
    <div>
      <TravelPostsForm returnTo={searchParams.returnTo} />
    </div>
  );
}
