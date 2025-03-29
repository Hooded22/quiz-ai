
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing SUPABASE_URL environment variable");
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing SUPABASE_ANON_KEY environment variable");
}

export async function createClient() {
  const cookieStore = await cookies()

  console.log("Create clinet", process.env.N)

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set({ name, value })
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}