import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import { NextResponse } from 'next/server';

const isStudentRoute = createRouteMatcher(['/user/(.*)']);
const isTeacherRoute = createRouteMatcher(['/teacher/(.*)']);

export default clerkMiddleware(async (auth, request) => {
  const { sessionClaims } = await auth();

  console.log('Request:', request);
  console.log('Request URL:', request.url);

  console.log('Session claim', sessionClaims);

  console.log('Is this a student route? ', isStudentRoute(request));
  console.log('Is this a teacher route? ', isTeacherRoute(request));

  const userRole =
    (sessionClaims?.metadata as { userType: 'teacher' | 'student' })
      ?.userType || 'student';

  console.log('USER ROLE', userRole);

  if (isStudentRoute(request)) {
    if (userRole !== 'student') {
      console.log('Redirecting non-student to teacher path...');
      const url = new URL('/teacher/courses', request.url);
      return NextResponse.redirect(url);
    }
  }

  if (isTeacherRoute(request)) {
    if (userRole !== 'teacher') {
      console.log('Redirecting non-teacher to student path...');
      const url = new URL('/user/courses', request.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
