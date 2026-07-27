import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // NOTE: File handling (e.g., uploading to Supabase Storage) is omitted for now.
    // We are focusing on creating the database record.

    const whiteGlove = formData.get('whiteGlove') === 'true';
    const photoShoot = formData.get('photoShoot') === 'true';

    const { data, error } = await supabase
      .from('sites')
      .insert([
        {
          // We'll need a user_id column eventually, but skipping for now.
          // In a real app, this would be linked to the authenticated user.
          // owner_name: formData.get('ownerName'), // Assuming a column name
          // business_name: formData.get('businessName'), 
          plan_tier: 'associate', // Default plan
          status: 'pending_review',
          white_glove_status: whiteGlove ? 'purchased' : 'not_purchased',
          photo_shoot_addon_purchased: photoShoot,
          // We would also save other form data like name, email, etc.
          // to columns that we would need to add to the 'sites' table.
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to create site.' }, { status: 500 });
    }

    // The SoT mentions an "Automated Creation, Scoring, & Human Review" process
    // that happens in the background. This is where we would trigger that.
    // For now, we'll just confirm the record was created.

    return NextResponse.json({ message: 'Onboarding request received.', site: data }, { status: 201 });

  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
