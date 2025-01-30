import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  try {
    const { data: { session } } = await supabase.auth.getSession();

    // If there's no session and the user is trying to access a protected route
    if (!session && request.nextUrl.pathname.startsWith("/interview")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // If there's a session and the user is trying to access auth pages
    if (session && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register")) {
      return NextResponse.redirect(new URL("/interview", request.url));
    }

    return response;
  } catch (error) {
    console.error("Auth middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/interview/:path*", "/login", "/register"],
};
