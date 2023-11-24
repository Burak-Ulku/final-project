import { cache } from 'react';
import { Travelpost } from '../migrations/00005-createTableTravelposts';
import { sql } from './connect';

export const getTravelPosts = cache(async () => {
  const user = await sql<Travelpost[]>`
    SELECT
      *
    FROM
      travel_posts
  `;
  return user;
});

export const getTravelPostById = cache(async (postId: number) => {
  const travelPost = await sql<Travelpost[]>`
    SELECT
      *
    FROM
      travel_posts
    WHERE
      id = ${postId}
  `;
  return travelPost[0]; // Assuming there's only one post with a given ID
});

export const createTravelpost = cache(
  async (
    userId: number,
    imageUrl: string,
    adress: string,
    placeName: string,
  ) => {
    const [travelpost] = await sql<Travelpost[]>`
      INSERT INTO
        travel_posts (
          user_id,
          image_url,
          adress,
          place_name
        )
      VALUES
        (
          ${userId},
          ${imageUrl},
          ${adress},
          ${placeName}
        ) RETURNING *
    `;
    return travelpost;
  },
);
