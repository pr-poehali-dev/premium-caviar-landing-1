CREATE TABLE IF NOT EXISTS t_p71088692_premium_caviar_landi.site_content (
  key VARCHAR(50) PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);