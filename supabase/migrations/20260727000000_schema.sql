CREATE TYPE site_status AS ENUM ('pending_review', 'ready_for_user', 'launched');
CREATE TYPE plan_tier AS ENUM ('associate', 'partner', 'senior_partner');
CREATE TYPE suggestion_status AS ENUM ('pending', 'adopted', 'dismissed');
CREATE TYPE white_glove_status AS ENUM ('not_purchased', 'purchased', 'in_progress', 'completed');
CREATE TYPE dns_method AS ENUM ('unselected', 'launchsite_managed', 'self_serve_instructions');
CREATE TYPE strategy_review_method AS ENUM ('unselected', 'manual_phone_scheduling', 'online_self_scheduling');

CREATE TABLE sites (
  id BIGSERIAL PRIMARY KEY,
  owner_name VARCHAR(255) NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  tagline TEXT,
  most_requested_service VARCHAR(255),
  highest_margin_service VARCHAR(255),
  logo_url TEXT,
  team_photo_url TEXT,
  status site_status DEFAULT 'pending_review',
  plan_tier plan_tier DEFAULT 'associate',
  nomenclature_profile VARCHAR(50) DEFAULT 'legal',
  is_paid BOOLEAN DEFAULT true,
  trial_ends_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '14 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  seo_meta_title VARCHAR(255) DEFAULT NULL,
  seo_meta_description TEXT DEFAULT NULL,
  seo_custom_keywords TEXT[] DEFAULT '{}',
  white_glove_status white_glove_status DEFAULT 'not_purchased',
  photo_shoot_addon_purchased BOOLEAN DEFAULT false,
  dns_method dns_method DEFAULT 'unselected',
  strategy_review_method strategy_review_method DEFAULT 'unselected',
  active_layout VARCHAR(50) DEFAULT 'Litigator',
  active_color_palette VARCHAR(50) DEFAULT 'Classic Blue',
  active_color_mode VARCHAR(20) DEFAULT 'light',
  active_font VARCHAR(50) DEFAULT 'Inter'
);
