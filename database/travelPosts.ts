import { cache } from 'react';
import { Travelpost } from '../migrations/00006-createTableTravelposts';
import { sql } from './connect';

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
