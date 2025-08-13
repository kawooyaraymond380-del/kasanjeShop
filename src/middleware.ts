
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // These are the public paths that do not require authentication.
  const publicPaths = ['/signin', '/signup', '/'];

  // This is a placeholder for checking if the user is authenticated.
  // In a real application, you would check for a valid session cookie or token.
  const isAuthenticated = false; // Replace with actual auth check logic

  // If the user is trying to access a protected route and is not authenticated,
  // redirect them to the sign-in page.
  if (!isAuthenticated && !publicPaths.some(p => pathname.startsWith(p) || pathname === p)) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // If the user is authenticated and tries to access sign-in or sign-up,
  // redirect them to the dashboard.
  if (isAuthenticated && (pathname.startsWith('/signin') || pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
