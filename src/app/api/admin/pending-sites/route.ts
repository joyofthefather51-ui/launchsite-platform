import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: sites, error } = await supabase
      .from('sites')
      .select('*')
      .eq('status', 'pending_review')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch pending sites.' }, { status: 500 });
    }

    return NextResponse.json(sites);

  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
