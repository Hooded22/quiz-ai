import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const gptApiKey = process.env.GPT_API_KEY;

  if (!gptApiKey) {
    // Prevent redirection loop by excluding `/forbidden` path
    if (req.nextUrl.pathname !== '/forbidden') {
      return NextResponse.redirect(new URL('/forbidden', req.url));
    }
  }

  return NextResponse.next();
}

// Exclude `/forbidden` from being matched by the middleware
export const config = {
  matcher: ['/', '/questions/:path*'],
};
