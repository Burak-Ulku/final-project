export const createUser = cache(
  async (lattitudeLongitude: number, userId: number) => {
    const [user] = await sql<Map[]>`
      INSERT INTO
        maps (
          lattitudeLongitude,
          userId
        )
      VALUES
        (
          ${lattitudeLongitude},
          ${userId}
        ) RETURNING id,
        username
    `;
    return user;
  },
);
