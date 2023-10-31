export const createUser = cache(
  async (
    rating: number,
    commentWriterId: number,
    commentMapId: number,
    commentText: string,
  ) => {
    const [user] = await sql<Comment[]>`
      INSERT INTO
        comments (
          rating,
          commentWriterId,
          commentMapId
        )
      VALUES
        (
          ${rating},
          ${commentWriterId},
          ${commentMapId},
          ${commentText}
        ) RETURNING id,
        username
    `;
    return user;
  },
);
