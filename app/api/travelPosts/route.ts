import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createTravelpost } from '../../../database/travelPosts';
import { uploadImageToCloudinary } from '../../../database/uploadToCloudinary';
import { getUserBySessionToken } from '../../../database/users';
import { Travelpost } from '../../../migrations/00006-createTableTravelposts';

// import { createSession } from '../../../../database/sessions';
// import { getUserWithPasswordHashByUsername } from '../../../../database/users';
// import { secureCookieOptions } from '../../../../util/cookies';

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
  console.log(body);

  const result = travelPostSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        errors: result.error.issues,
      },
      { status: 400 },
    );
  }
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) {
    return NextResponse.json(
      {
        errors: [{ message: 'user not defined' }],
      },
      { status: 400 },
    );
  }
  const post = await createTravelpost(
    user.id,
    result.data.imageUrl,
    result.data.adress,
    result.data.place,
  );

  //error handling
  if (!post) {
    return NextResponse.json(
      {
        errors: [{ message: 'post not defined' }],
      },
      { status: 400 },
    );
  }

  const travelPost = await uploadImageToCloudinary(result.data.imageUrl);

  if (travelPost === 200) {
    return NextResponse.json(
      {
        errors: [{ message: 'Picture uploaded' }],
      },
      { status: 200 },
    );
  } else {
    return NextResponse.json(
      {
        errors: [{ message: 'Picture uploading failed' }],
      },
      { status: travelPost },
    );
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
