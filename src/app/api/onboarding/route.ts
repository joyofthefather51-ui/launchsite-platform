import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

function getStringField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const businessName = getStringField(formData, 'businessName');
    const ownerName = getStringField(formData, 'ownerName');
    const email = getStringField(formData, 'email');

    if (!businessName || !ownerName || !email) {
      return NextResponse.json(
        { error: 'Business name, owner name, and email are required.' },
        { status: 400 }
      );
    }

    // NOTE: File handling (e.g., uploading to Supabase Storage) is omitted for now.

    const whiteGlove = formData.get('whiteGlove') === 'true';
    const photoShoot = formData.get('photoShoot') === 'true';

    const { data, error } = await getSupabaseAdmin()
      .from('sites')
      .insert([
        {
          business_name: businessName,
          owner_name: ownerName,
          tagline: getStringField(formData, 'tagline') || null,
          most_requested_service: getStringField(formData, 'mostRequestedService') || null,
          highest_margin_service: getStringField(formData, 'highestMarginService') || null,
          phone: getStringField(formData, 'phone') || null,
          email,
          address: getStringField(formData, 'address') || null,
          plan_tier: 'associate', // Default plan
          status: 'pending_review',
          white_glove_status: whiteGlove ? 'purchased' : 'not_purchased',
          photo_shoot_addon_purchased: photoShoot,
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
