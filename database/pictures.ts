export const createUser = cache(async (pictureBlob: number, mapId: number) => {
  const [user] = await sql<Picture[]>`
    INSERT INTO
      pictures (
        pictureBlob,
        mapId
      )
    VALUES
      (
        ${pictureBlob},
        ${mapId}
      ) RETURNING id,
      username
  `;
  return user;
});
