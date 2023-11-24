import Image from 'next/image';
import { notFound } from 'next/navigation';
// import { formatDate } from '../../../util/dates';
import { getTravelPostById } from '../../../database/travelPosts';

type Props = {
  params: {
    postId: string;
  };
};

export async function generateMetadata(props: Props) {
  const singlePost = await getTravelPostById(Number(props.params.postId));

  return {
    title: singlePost ? singlePost.placeName : '',
  };
}

export default async function TravelPostPage(props: Props) {
  const singlePost = await getTravelPostById(Number(props.params.postId));

  if (!singlePost) {
    return notFound();
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h1>{singlePost.placeName}</h1>
        {/* <div>{formatDate(singlePost.date)}</div> */}
        {/* Add additional fields as needed */}
        <img
          src={singlePost.placeName}
          width={200}
          height={200}
          alt="singlePost.placeName"
        />
        {/* Display other details of the travel post */}
        <p>{singlePost.placeName}</p>
      </div>
    </div>
  );
}
