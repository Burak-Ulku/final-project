import { NextRequest, NextResponse } from 'next/server';

export const config = {
  //  The matcher config can also take an array of path
  matcher: '/travelPost/:path*',
};

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  // console.log('header Objects:', requestHeaders);
  // console.log('Called path: ', request.nextUrl.pathname);
  // console.log('Middleware called');
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
