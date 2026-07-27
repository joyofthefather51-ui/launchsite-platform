export type SiteStatus = 'pending_review' | 'ready_for_user' | 'launched';
export type PlanTier = 'associate' | 'partner' | 'senior_partner';

export interface Site {
  id: number;
  owner_name: string;
  business_name: string;
  email: string;
  phone: string;
  status: SiteStatus;
  plan_tier: PlanTier;
}
