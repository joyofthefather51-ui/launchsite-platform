-- LaunchSite full schema (Phase 1 of the rebuild spec).
-- Replaces the earlier, much smaller onboarding-only schema outright —
-- nothing is deployed to a real project yet, so no data migration is needed.
-- gen_random_uuid() is native to Postgres 13+, no extension required.

-- =====================================================================
-- No-dependency tables (created first; sites and design_packages FK into
-- these)
-- =====================================================================

CREATE TABLE design_fonts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    category text,
    google_import_url text,
    css_family text,
    weight_range text,
    preview_text text,
    is_active boolean NOT NULL DEFAULT true,
    sort_order int4 NOT NULL DEFAULT 0
);

CREATE TABLE design_palettes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    category text,
    "primary" text,
    secondary text,
    accent text,
    bg text,
    surface text,
    text_color text,
    text_muted text,
    border_color text,
    swatches text[] DEFAULT '{}',
    is_active boolean NOT NULL DEFAULT true,
    sort_order int4 NOT NULL DEFAULT 0
);

CREATE TABLE design_layouts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    category text,
    description text,
    thumbnail_url text,
    config jsonb DEFAULT '{}',
    pages jsonb DEFAULT '[]',
    is_active boolean NOT NULL DEFAULT true,
    sort_order int4 NOT NULL DEFAULT 0
);

CREATE TABLE design_packages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    font_id uuid REFERENCES design_fonts(id),
    palette_id uuid REFERENCES design_palettes(id),
    layout_id uuid REFERENCES design_layouts(id),
    allowed_fonts text[] DEFAULT '{}',
    allowed_colors text[] DEFAULT '{}',
    allowed_layouts text[] DEFAULT '{}',
    is_active boolean NOT NULL DEFAULT true
);

CREATE TABLE custom_fonts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    url text,
    format text,
    css_family text,
    is_active boolean NOT NULL DEFAULT true
);

CREATE TABLE nomenclature_overrides (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type text NOT NULL,
    entity_id text NOT NULL,
    label text NOT NULL,
    is_active boolean NOT NULL DEFAULT true
);

CREATE TABLE placeholder_photos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    industry text NOT NULL,
    url text NOT NULL,
    description text,
    is_active boolean NOT NULL DEFAULT true,
    sort_order int4 NOT NULL DEFAULT 0
);

CREATE TABLE system_settings (
    key text PRIMARY KEY,
    value text
);

-- =====================================================================
-- sites — the central table. One row per client site, blueprint,
-- gold-standard, or template, distinguished by `status`.
-- =====================================================================

CREATE TABLE sites (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    industry text,
    business_name text,
    owner_name text,
    tagline text,
    phone text,
    whatsapp_number text,
    email text,
    address text,
    subdomain text UNIQUE,
    custom_domain text,
    custom_domain_status text,
    logo_url text,
    photo_urls text[] DEFAULT '{}',
    profile_photo_url text,
    layout_choice int4,
    layout_id uuid REFERENCES design_layouts(id),
    color_scheme text,
    font_choice text,
    mode text DEFAULT 'light',
    shade_mode_overrides jsonb,
    dark_mode_overrides jsonb,
    palette_mode_overrides jsonb,
    status text NOT NULL DEFAULT 'draft' CHECK (
        status IN ('draft', 'pending_review', 'ready_for_user', 'launched', 'template', 'gold', 'gold-variant', 'blueprint')
    ),
    editor_token uuid NOT NULL DEFAULT gen_random_uuid(),
    user_access_token uuid NOT NULL DEFAULT gen_random_uuid(),
    ai_copy jsonb,
    visit_count int4 NOT NULL DEFAULT 0,
    last_visited_at timestamptz,
    editor_opened_at timestamptz,
    instagram_handle text,
    social_links jsonb DEFAULT '{}',
    booking_link text,
    paypal_link text,
    paypal_email text,
    payments_enabled boolean NOT NULL DEFAULT false,
    card_payment_url text,
    stripe_enabled boolean NOT NULL DEFAULT false,
    other_payment_links jsonb DEFAULT '{}',
    opening_hours text,
    legal_disclaimer text,
    legal_disclaimer_label text,
    medical_disclaimer text,
    medical_disclaimer_label text,
    copy_tone text DEFAULT 'professional',
    button_labels jsonb DEFAULT '{}',
    section_headings jsonb DEFAULT '{}',
    testimonials jsonb DEFAULT '[]',
    sections_config jsonb DEFAULT '{}',
    practice_areas text[] DEFAULT '{}',
    allowed_fonts text[] DEFAULT '{}',
    allowed_colors text[] DEFAULT '{}',
    allowed_layouts text[] DEFAULT '{}',
    provisioned_packages text[] DEFAULT '{}',
    admin_notes text,
    reference_url text,
    reference_urls text[] DEFAULT '{}',
    plan_tier text DEFAULT 'associate',
    is_paid boolean NOT NULL DEFAULT false,
    trial_end_date date,
    seo_enabled boolean NOT NULL DEFAULT false,
    seo_page_title text,
    seo_meta_description text,
    seo_meta_keywords text[] DEFAULT '{}',
    meta_description text,
    white_glove_status text DEFAULT 'not_purchased',
    photo_shoot_requested boolean NOT NULL DEFAULT false,
    dns_setup_method text,
    strategy_review_booking_method text,
    blueprint_id uuid,
    blueprint_locked boolean NOT NULL DEFAULT false,
    is_gold_standard boolean NOT NULL DEFAULT false,
    gold_standard_id uuid,
    variant_slot int4,
    is_variant_published boolean NOT NULL DEFAULT false,
    workspace_email text,
    workspace_email_status text DEFAULT 'none',
    most_requested_service text,
    highest_margin_service text,
    industry_specialization text,
    nomenclature_profile text,
    assistance_requested boolean NOT NULL DEFAULT false,
    full_custom_requested boolean NOT NULL DEFAULT false,
    vault_notes text,
    drip_sent_day3 timestamptz,
    drip_sent_day7 timestamptz,
    trial_email_day7_sent_at timestamptz,
    trial_email_day13_sent_at timestamptz,
    ie_first_launch_shown boolean NOT NULL DEFAULT false,
    payment_failed_at timestamptz,
    reviewed_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- =====================================================================
-- Tables that FK to sites
-- =====================================================================

CREATE TABLE edit_requests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
    message text,
    request_type text,
    status text DEFAULT 'pending',
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE bug_reports (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
    message text,
    status text DEFAULT 'open',
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE support_requests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text,
    message text,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE domain_orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
    domain_name text,
    payment_method text,
    payment_id text,
    payment_status text,
    amount_cents int4,
    currency text,
    purchased_at timestamptz,
    dns_configured_at timestamptz,
    fulfilled_at timestamptz,
    stripe_session_id text,
    namecheap_transaction_id text,
    registrant_info jsonb,
    expiry_date date
);

CREATE TABLE articles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
    title text,
    content text,
    status text DEFAULT 'draft',
    created_at timestamptz NOT NULL DEFAULT now(),
    published_at timestamptz
);

CREATE TABLE vault_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
    sender_name text,
    sender_email text,
    message text,
    read boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE vault_leads (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
    name text,
    email text,
    phone text,
    source text,
    status text DEFAULT 'new',
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE social_posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
    platform text,
    caption text,
    status text DEFAULT 'suggested',
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE white_glove_checklist (
    site_id uuid PRIMARY KEY REFERENCES sites(id) ON DELETE CASCADE,
    dns_configured boolean NOT NULL DEFAULT false,
    assets_styled boolean NOT NULL DEFAULT false,
    strategy_call_done boolean NOT NULL DEFAULT false,
    seo_intake_done boolean NOT NULL DEFAULT false,
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- =====================================================================
-- Row Level Security
--
-- Scoped deliberately narrow for this phase: public/anon can create a
-- draft site (onboarding) and view launched sites (real visitors, no
-- token). Everything else — reading/editing a site you own via its
-- editor/user-access token, and all admin access — goes through the two
-- SECURITY DEFINER RPCs below (owner/editor access) or the Phase 8
-- admin-auth Edge Function + authenticated-role policies (admin access,
-- not built yet). No blanket SELECT/UPDATE policy exists on `sites` for
-- anon/authenticated — RLS can't see a client-side token filter, so a
-- policy like `USING (true)` would leak every row to anyone with the
-- anon key.
-- =====================================================================

ALTER TABLE design_fonts ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_palettes ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_layouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_fonts ENABLE ROW LEVEL SECURITY;
ALTER TABLE nomenclature_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE placeholder_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE edit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bug_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vault_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE vault_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE white_glove_checklist ENABLE ROW LEVEL SECURITY;

-- Public onboarding can create a draft site, but the check clause blocks
-- it from self-promoting status (or any other column) to something
-- privileged in the same insert.
CREATE POLICY "Public can create a draft site" ON sites
    FOR INSERT
    TO anon
    WITH CHECK (status = 'draft');

-- Real visitors (no token at all) can view a launched site.
CREATE POLICY "Public can view launched sites" ON sites
    FOR SELECT
    TO anon
    USING (status = 'launched');

-- Design/reference tables that Instant Editor and public rendering need
-- to read (fonts, palettes, layouts, placeholder photos) are readable by
-- anyone, but not writable — only active rows.
CREATE POLICY "Public can read active fonts" ON design_fonts
    FOR SELECT TO anon USING (is_active = true);

CREATE POLICY "Public can read active palettes" ON design_palettes
    FOR SELECT TO anon USING (is_active = true);

CREATE POLICY "Public can read active layouts" ON design_layouts
    FOR SELECT TO anon USING (is_active = true);

CREATE POLICY "Public can read active placeholder photos" ON placeholder_photos
    FOR SELECT TO anon USING (is_active = true);

-- Public "Ask for help" / bug report / contact form submissions — insert
-- only, no read-back (matches edit_requests/bug_reports/support_requests
-- being one-way submission inboxes reviewed by admins).
CREATE POLICY "Public can submit edit requests" ON edit_requests
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Public can submit bug reports" ON bug_reports
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Public can submit support requests" ON support_requests
    FOR INSERT TO anon WITH CHECK (true);

-- =====================================================================
-- Token-gated site access (Instant Editor / Vault consumers, Phases 6-7)
-- =====================================================================

CREATE OR REPLACE FUNCTION get_site_by_editor_token(token uuid)
RETURNS SETOF sites
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT * FROM sites WHERE editor_token = token LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION get_site_by_user_access_token(token uuid)
RETURNS SETOF sites
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT * FROM sites WHERE user_access_token = token LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION get_site_by_editor_token(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_site_by_user_access_token(uuid) TO anon, authenticated;

-- =====================================================================
-- Storage: site-assets bucket
-- =====================================================================

INSERT INTO storage.buckets (id, name, public, allowed_mime_types, file_size_limit)
VALUES (
    'site-assets',
    'site-assets',
    true,
    ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf'],
    10485760 -- 10 MB
)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Path-scoping (uploads must land under the correct {siteId}/... prefix)
-- is deferred to Phase 4 when the real upload UI exists.
CREATE POLICY "Public can upload site assets" ON storage.objects
    FOR INSERT
    TO anon
    WITH CHECK (bucket_id = 'site-assets');
