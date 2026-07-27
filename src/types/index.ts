export type SiteStatus = 'pending_review' | 'ready_for_user' | 'launched';
export type PlanTier = 'associate' | 'partner' | 'senior_partner';
export type WhiteGloveStatus = 'not_purchased' | 'purchased' | 'in_progress' | 'completed';

export interface Site {
  id: number;
  created_at: string;
  owner_name: string;
  business_name: string;
  tagline: string | null;
  most_requested_service: string | null;
  highest_margin_service: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  status: SiteStatus;
  plan_tier: PlanTier;
  white_glove_status: WhiteGloveStatus;
  photo_shoot_addon_purchased: boolean;
}
