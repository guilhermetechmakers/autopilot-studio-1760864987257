-- =====================================================
-- Migration: Create monitoring and health check tables
-- Created: 2025-01-13T12:00:00Z
-- Tables: system_health, health_checks, incidents, alerts, performance_metrics
-- Purpose: Enable comprehensive monitoring and alerting system
-- =====================================================

-- Enable UUID extension (idempotent)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Helper function for updated_at (idempotent)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TABLE: system_health
-- Purpose: Overall system health status and metrics
-- =====================================================
CREATE TABLE IF NOT EXISTS system_health (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tenant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Health status
  status TEXT DEFAULT 'healthy' CHECK (status IN ('healthy', 'degraded', 'unhealthy', 'critical')),
  overall_score INTEGER DEFAULT 100 CHECK (overall_score >= 0 AND overall_score <= 100),
  
  -- System metrics
  cpu_usage DECIMAL(5,2) DEFAULT 0.0,
  memory_usage DECIMAL(5,2) DEFAULT 0.0,
  disk_usage DECIMAL(5,2) DEFAULT 0.0,
  response_time_ms INTEGER DEFAULT 0,
  
  -- Service status
  database_status TEXT DEFAULT 'healthy',
  api_status TEXT DEFAULT 'healthy',
  integrations_status TEXT DEFAULT 'healthy',
  background_jobs_status TEXT DEFAULT 'healthy',
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================================
-- TABLE: health_checks
-- Purpose: Individual health check results for services and integrations
-- =====================================================
CREATE TABLE IF NOT EXISTS health_checks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tenant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Check details
  check_name TEXT NOT NULL,
  service_name TEXT NOT NULL,
  check_type TEXT NOT NULL CHECK (check_type IN ('api', 'database', 'integration', 'background_job', 'external_service')),
  
  -- Status and results
  status TEXT NOT NULL CHECK (status IN ('pass', 'fail', 'warning', 'timeout')),
  response_time_ms INTEGER DEFAULT 0,
  status_code INTEGER,
  
  -- Error details
  error_message TEXT,
  error_code TEXT,
  stack_trace TEXT,
  
  -- Check configuration
  endpoint_url TEXT,
  expected_response TEXT,
  timeout_ms INTEGER DEFAULT 30000,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================================
-- TABLE: incidents
-- Purpose: Track system incidents and outages
-- =====================================================
CREATE TABLE IF NOT EXISTS incidents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tenant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Incident details
  title TEXT NOT NULL,
  description TEXT,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'closed')),
  
  -- Impact
  affected_services TEXT[] DEFAULT '{}',
  affected_users INTEGER DEFAULT 0,
  business_impact TEXT,
  
  -- Timeline
  started_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  resolved_at TIMESTAMPTZ,
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by UUID REFERENCES auth.users(id),
  
  -- Resolution
  root_cause TEXT,
  resolution_notes TEXT,
  resolution_steps TEXT[],
  
  -- Metadata
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================================
-- TABLE: alerts
-- Purpose: Alert rules and notifications
-- =====================================================
CREATE TABLE IF NOT EXISTS alerts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tenant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Alert configuration
  name TEXT NOT NULL,
  description TEXT,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('threshold', 'anomaly', 'error_rate', 'response_time', 'custom')),
  
  -- Conditions
  metric_name TEXT NOT NULL,
  operator TEXT NOT NULL CHECK (operator IN ('>', '<', '>=', '<=', '=', '!=', 'contains', 'not_contains')),
  threshold_value DECIMAL(10,2) NOT NULL,
  evaluation_window_minutes INTEGER DEFAULT 5,
  
  -- Alert settings
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  is_enabled BOOLEAN DEFAULT true,
  cooldown_minutes INTEGER DEFAULT 15,
  
  -- Notification settings
  notification_channels TEXT[] DEFAULT '{}',
  notification_template TEXT,
  
  -- Status
  last_triggered_at TIMESTAMPTZ,
  trigger_count INTEGER DEFAULT 0,
  is_triggered BOOLEAN DEFAULT false,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================================
-- TABLE: performance_metrics
-- Purpose: Store performance metrics and KPIs
-- =====================================================
CREATE TABLE IF NOT EXISTS performance_metrics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tenant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Metric details
  metric_name TEXT NOT NULL,
  metric_type TEXT NOT NULL CHECK (metric_type IN ('counter', 'gauge', 'histogram', 'timer')),
  value DECIMAL(15,4) NOT NULL,
  unit TEXT,
  
  -- Context
  service_name TEXT,
  endpoint TEXT,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  
  -- Dimensions
  dimensions JSONB DEFAULT '{}'::jsonb,
  
  -- Timestamps
  timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- System health indexes
CREATE INDEX IF NOT EXISTS system_health_tenant_id_idx ON system_health(tenant_id);
CREATE INDEX IF NOT EXISTS system_health_created_at_idx ON system_health(created_at DESC);
CREATE INDEX IF NOT EXISTS system_health_status_idx ON system_health(status);

-- Health checks indexes
CREATE INDEX IF NOT EXISTS health_checks_tenant_id_idx ON health_checks(tenant_id);
CREATE INDEX IF NOT EXISTS health_checks_created_at_idx ON health_checks(created_at DESC);
CREATE INDEX IF NOT EXISTS health_checks_service_name_idx ON health_checks(service_name);
CREATE INDEX IF NOT EXISTS health_checks_status_idx ON health_checks(status);
CREATE INDEX IF NOT EXISTS health_checks_check_type_idx ON health_checks(check_type);

-- Incidents indexes
CREATE INDEX IF NOT EXISTS incidents_tenant_id_idx ON incidents(tenant_id);
CREATE INDEX IF NOT EXISTS incidents_created_at_idx ON incidents(created_at DESC);
CREATE INDEX IF NOT EXISTS incidents_status_idx ON incidents(status);
CREATE INDEX IF NOT EXISTS incidents_severity_idx ON incidents(severity);
CREATE INDEX IF NOT EXISTS incidents_started_at_idx ON incidents(started_at DESC);

-- Alerts indexes
CREATE INDEX IF NOT EXISTS alerts_tenant_id_idx ON alerts(tenant_id);
CREATE INDEX IF NOT EXISTS alerts_is_enabled_idx ON alerts(is_enabled) WHERE is_enabled = true;
CREATE INDEX IF NOT EXISTS alerts_metric_name_idx ON alerts(metric_name);
CREATE INDEX IF NOT EXISTS alerts_is_triggered_idx ON alerts(is_triggered) WHERE is_triggered = true;

-- Performance metrics indexes
CREATE INDEX IF NOT EXISTS performance_metrics_tenant_id_idx ON performance_metrics(tenant_id);
CREATE INDEX IF NOT EXISTS performance_metrics_timestamp_idx ON performance_metrics(timestamp DESC);
CREATE INDEX IF NOT EXISTS performance_metrics_metric_name_idx ON performance_metrics(metric_name);
CREATE INDEX IF NOT EXISTS performance_metrics_service_name_idx ON performance_metrics(service_name);

-- =====================================================
-- TRIGGERS FOR AUTO-UPDATE
-- =====================================================

-- System health triggers
DROP TRIGGER IF EXISTS update_system_health_updated_at ON system_health;
CREATE TRIGGER update_system_health_updated_at
  BEFORE UPDATE ON system_health
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Health checks triggers
DROP TRIGGER IF EXISTS update_health_checks_updated_at ON health_checks;
CREATE TRIGGER update_health_checks_updated_at
  BEFORE UPDATE ON health_checks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Incidents triggers
DROP TRIGGER IF EXISTS update_incidents_updated_at ON incidents;
CREATE TRIGGER update_incidents_updated_at
  BEFORE UPDATE ON incidents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Alerts triggers
DROP TRIGGER IF EXISTS update_alerts_updated_at ON alerts;
CREATE TRIGGER update_alerts_updated_at
  BEFORE UPDATE ON alerts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE system_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

-- System health policies
CREATE POLICY "system_health_select_own"
  ON system_health FOR SELECT
  USING (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "system_health_insert_own"
  ON system_health FOR INSERT
  WITH CHECK (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "system_health_update_own"
  ON system_health FOR UPDATE
  USING (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ))
  WITH CHECK (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

-- Health checks policies
CREATE POLICY "health_checks_select_own"
  ON health_checks FOR SELECT
  USING (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "health_checks_insert_own"
  ON health_checks FOR INSERT
  WITH CHECK (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

-- Incidents policies
CREATE POLICY "incidents_select_own"
  ON incidents FOR SELECT
  USING (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "incidents_insert_own"
  ON incidents FOR INSERT
  WITH CHECK (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "incidents_update_own"
  ON incidents FOR UPDATE
  USING (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ))
  WITH CHECK (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

-- Alerts policies
CREATE POLICY "alerts_select_own"
  ON alerts FOR SELECT
  USING (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "alerts_insert_own"
  ON alerts FOR INSERT
  WITH CHECK (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "alerts_update_own"
  ON alerts FOR UPDATE
  USING (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ))
  WITH CHECK (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

-- Performance metrics policies
CREATE POLICY "performance_metrics_select_own"
  ON performance_metrics FOR SELECT
  USING (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "performance_metrics_insert_own"
  ON performance_metrics FOR INSERT
  WITH CHECK (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

-- =====================================================
-- DOCUMENTATION
-- =====================================================

COMMENT ON TABLE system_health IS 'Overall system health status and metrics for monitoring dashboard';
COMMENT ON TABLE health_checks IS 'Individual health check results for services and integrations';
COMMENT ON TABLE incidents IS 'System incidents and outages tracking with resolution workflow';
COMMENT ON TABLE alerts IS 'Alert rules and notification configuration for monitoring';
COMMENT ON TABLE performance_metrics IS 'Performance metrics and KPIs for analytics and monitoring';

-- =====================================================
-- ROLLBACK INSTRUCTIONS (for documentation only)
-- =====================================================
-- To rollback this migration, execute:
-- DROP TABLE IF EXISTS performance_metrics CASCADE;
-- DROP TABLE IF EXISTS alerts CASCADE;
-- DROP TABLE IF EXISTS incidents CASCADE;
-- DROP TABLE IF EXISTS health_checks CASCADE;
-- DROP TABLE IF EXISTS system_health CASCADE;
