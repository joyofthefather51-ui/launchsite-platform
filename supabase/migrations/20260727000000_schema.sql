-- Core Status Enums
CREATE TYPE site_status AS ENUM ('pending_review', 'ready_for_user', 'launched');
CREATE TYPE plan_tier AS ENUM ('associate', 'partner', 'senior_partner');
CREATE TYPE suggestion_status AS ENUM ('pending', 'adopted', 'dismissed');
CREATE TYPE white_glove_status AS ENUM ('not_purchased', 'purchased', 'in_progress', 'completed');
CREATE TYPE dns_method AS ENUM ('unselected', 'launchsite_managed', 'self_serve_instructions');
CREATE TYPE strategy_review_method AS ENUM ('unselected', 'manual_phone_scheduling', 'online_self_scheduling');

-- Base Sites Table
CREATE TABLE sites (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status site_status DEFAULT 'pending_review',
    plan_tier plan_tier DEFAULT 'associate',
    nomenclature_profile VARCHAR(50) DEFAULT 'legal',
    is_paid BOOLEAN DEFAULT true,
    trial_ends_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '14 days'),
    seo_meta_title VARCHAR(255) DEFAULT NULL,
    seo_meta_description TEXT DEFAULT NULL,
    seo_custom_keywords TEXT[] DEFAULT '{}',
    white_glove_status white_glove_status DEFAULT 'not_purchased',
    photo_shoot_addon_purchased BOOLEAN DEFAULT false,
    dns_method dns_method DEFAULT 'unselected',
    strategy_review_method strategy_review_method DEFAULT 'unselected'
);

-- Per-Variant AI Scoring
CREATE TABLE site_variant_scores (
    id BIGSERIAL PRIMARY KEY,
    site_id BIGINT REFERENCES sites(id) ON DELETE CASCADE,
    variant_layout_name VARCHAR(50) NOT NULL,
    aesthetic_confidence_score NUMERIC(4,3) NOT NULL,
    human_reviewed BOOLEAN DEFAULT false,
    selected_for_ie BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System-Level Configuration
CREATE TABLE system_config (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed row for system_config
INSERT INTO system_config (key, value) VALUES ('ai_auto_advance_enabled', 'false');

-- Senior Partner Social Content Feed Table
CREATE TABLE social_content_suggestions (
    id BIGSERIAL PRIMARY KEY,
    site_id BIGINT REFERENCES sites(id) ON DELETE CASCADE,
    content_body TEXT NOT NULL,
    status suggestion_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- White-Glove Fulfillment Checklist
CREATE TABLE white_glove_fulfillment (
    site_id BIGINT PRIMARY KEY REFERENCES sites(id) ON DELETE CASCADE,
    dns_configured BOOLEAN DEFAULT false,
    asset_styling_completed BOOLEAN DEFAULT false,
    strategy_review_completed BOOLEAN DEFAULT false,
    seo_intake_pass_completed BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
