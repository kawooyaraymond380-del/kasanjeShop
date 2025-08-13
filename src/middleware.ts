
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The Firebase auth state is managed on the client, so the middleware
  // doesn't have access to it. We will handle redirects on the client-side
  // in the page components themselves.
  
  // For now, the middleware will just allow all requests to pass through.
  // We can add more complex logic here later if needed (e.g., for API routes).

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
