import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from 'utils/supabase/client';

export async function POST(request: Request) {
    try {
        const supabase = createClient()
        const body = await request.json();


        const { title, description, user_id } = body;

        let userId = user_id;
        if (!userId) {
            const { data: { session } } = await supabase.auth.getSession();
            userId = session?.user?.id || null;
        }

        // Insert the feedback into the Supabase table
        console.log("Inswer to supabase: ", userId, title, description);
        const { data, error } = await supabase
            .from('feedback')
            .insert({
                title,
                description,
                user_id: userId
            })


        if (error) {
            console.error('Error inserting feedback:', error);
            return NextResponse.json(
                { error: 'Failed to submit feedback' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Feedback submitted successfully', data },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error in feedback API:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 