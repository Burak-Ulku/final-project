import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Travelpost } from '../../../../migrations/00006-createTableTravelposts';

// import { createSession } from '../../../../database/sessions';
// import { getUserWithPasswordHashByUsername } from '../../../../database/users';
// import { secureCookieOptions } from '../../../../util/cookies';

const { Pool } = require('pg');

// Create a PostgreSQL pool
const pool = new Pool({
  user: 'final',
  host: 'localhost',
  database: 'final',
  password: 'final',
  port: 5432, // PostgreSQL default port
});

const travelPostSchema = z.object({
  imageUrl: z.string().min(3),
  adress: z.string().min(3),
  place: z.string().min(3),
});

export type TravelPostsResponseBodyPost =
  | {
      travelPost: Travelpost;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<TravelPostsResponseBodyPost>> {
  const body = await request.json();

  const result = travelPostSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        errors: result.error.issues,
      },
      { status: 400 },
    );
  } else {
    return NextResponse.json({ errors: [{ message: 'Success' }] });
  }
}

//   // const user = await getUserByUsername(result.data.username);
//   const userWithPasswordHash = await getUserWithPasswordHashByUsername(
//     result.data.username,
//   );

//   if (!userWithPasswordHash) {
//     return NextResponse.json(
//       { errors: [{ message: 'username or password not valid' }] },
//       { status: 403 },
//     );
//   }

//   console.log('Check:', userWithPasswordHash);

//   const isPasswordValid = await bcrypt.compare(
//     result.data.password,
//     userWithPasswordHash.passwordHash,
//   );

//   if (!isPasswordValid) {
//     return NextResponse.json(
//       { errors: [{ message: 'username or password not valid' }] },
//       { status: 401 },
//     );
//   }

//   const token = crypto.randomBytes(100).toString('base64');

//   // cookies().set({
//   //   name: 'sessionToken',
//   //   value: session.token,
//   //   httpOnly: true,
//   //   path: '/',
//   //   secure: process.env.NODE_ENV === 'production',
//   //   maxAge: 60 * 60 * 48, // Expires in 24 hours,
//   //   sameSite: 'lax', // this prevents CSRF attacks
//   // });

/*  return NextResponse.json({
    user: {
      username: userWithPasswordHash.username,
    },
  });
}*/
