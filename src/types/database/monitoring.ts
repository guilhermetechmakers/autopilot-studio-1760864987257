/**
 * Database types for monitoring tables
 * Generated: 2025-01-13T12:00:00Z
 */

// =====================================================
// SYSTEM HEALTH TYPES
// =====================================================

export interface SystemHealth {
  id: string;
  tenant_id: string;
  status: 'healthy' | 'degraded' | 'unhealthy' | 'critical';
  overall_score: number;
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  response_time_ms: number;
  database_status: string;
  api_status: string;
  integrations_status: string;
  background_jobs_status: string;
  metadata: Record<string, any>;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SystemHealthInsert {
  id?: string;
  tenant_id: string;
  status?: 'healthy' | 'degraded' | 'unhealthy' | 'critical';
  overall_score?: number;
  cpu_usage?: number;
  memory_usage?: number;
  disk_usage?: number;
  response_time_ms?: number;
  database_status?: string;
  api_status?: string;
  integrations_status?: string;
  background_jobs_status?: string;
  metadata?: Record<string, any>;
  notes?: string | null;
}

export interface SystemHealthUpdate {
  status?: 'healthy' | 'degraded' | 'unhealthy' | 'critical';
  overall_score?: number;
  cpu_usage?: number;
  memory_usage?: number;
  disk_usage?: number;
  response_time_ms?: number;
  database_status?: string;
  api_status?: string;
  integrations_status?: string;
  background_jobs_status?: string;
  metadata?: Record<string, any>;
  notes?: string | null;
}

// =====================================================
// HEALTH CHECKS TYPES
// =====================================================

export interface HealthCheck {
  id: string;
  tenant_id: string;
  check_name: string;
  service_name: string;
  check_type: 'api' | 'database' | 'integration' | 'background_job' | 'external_service';
  status: 'pass' | 'fail' | 'warning' | 'timeout';
  response_time_ms: number;
  status_code: number | null;
  error_message: string | null;
  error_code: string | null;
  stack_trace: string | null;
  endpoint_url: string | null;
  expected_response: string | null;
  timeout_ms: number;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface HealthCheckInsert {
  id?: string;
  tenant_id: string;
  check_name: string;
  service_name: string;
  check_type: 'api' | 'database' | 'integration' | 'background_job' | 'external_service';
  status: 'pass' | 'fail' | 'warning' | 'timeout';
  response_time_ms?: number;
  status_code?: number | null;
  error_message?: string | null;
  error_code?: string | null;
  stack_trace?: string | null;
  endpoint_url?: string | null;
  expected_response?: string | null;
  timeout_ms?: number;
  metadata?: Record<string, any>;
}

export interface HealthCheckUpdate {
  check_name?: string;
  service_name?: string;
  check_type?: 'api' | 'database' | 'integration' | 'background_job' | 'external_service';
  status?: 'pass' | 'fail' | 'warning' | 'timeout';
  response_time_ms?: number;
  status_code?: number | null;
  error_message?: string | null;
  error_code?: string | null;
  stack_trace?: string | null;
  endpoint_url?: string | null;
  expected_response?: string | null;
  timeout_ms?: number;
  metadata?: Record<string, any>;
}

// =====================================================
// INCIDENTS TYPES
// =====================================================

export interface Incident {
  id: string;
  tenant_id: string;
  title: string;
  description: string | null;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  affected_services: string[];
  affected_users: number;
  business_impact: string | null;
  started_at: string;
  resolved_at: string | null;
  acknowledged_at: string | null;
  acknowledged_by: string | null;
  root_cause: string | null;
  resolution_notes: string | null;
  resolution_steps: string[];
  tags: string[];
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface IncidentInsert {
  id?: string;
  tenant_id: string;
  title: string;
  description?: string | null;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status?: 'open' | 'investigating' | 'resolved' | 'closed';
  affected_services?: string[];
  affected_users?: number;
  business_impact?: string | null;
  started_at?: string;
  resolved_at?: string | null;
  acknowledged_at?: string | null;
  acknowledged_by?: string | null;
  root_cause?: string | null;
  resolution_notes?: string | null;
  resolution_steps?: string[];
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface IncidentUpdate {
  title?: string;
  description?: string | null;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  status?: 'open' | 'investigating' | 'resolved' | 'closed';
  affected_services?: string[];
  affected_users?: number;
  business_impact?: string | null;
  resolved_at?: string | null;
  acknowledged_at?: string | null;
  acknowledged_by?: string | null;
  root_cause?: string | null;
  resolution_notes?: string | null;
  resolution_steps?: string[];
  tags?: string[];
  metadata?: Record<string, any>;
}

// =====================================================
// ALERTS TYPES
// =====================================================

export interface Alert {
  id: string;
  tenant_id: string;
  name: string;
  description: string | null;
  alert_type: 'threshold' | 'anomaly' | 'error_rate' | 'response_time' | 'custom';
  metric_name: string;
  operator: '>' | '<' | '>=' | '<=' | '=' | '!=' | 'contains' | 'not_contains';
  threshold_value: number;
  evaluation_window_minutes: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  is_enabled: boolean;
  cooldown_minutes: number;
  notification_channels: string[];
  notification_template: string | null;
  last_triggered_at: string | null;
  trigger_count: number;
  is_triggered: boolean;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AlertInsert {
  id?: string;
  tenant_id: string;
  name: string;
  description?: string | null;
  alert_type: 'threshold' | 'anomaly' | 'error_rate' | 'response_time' | 'custom';
  metric_name: string;
  operator: '>' | '<' | '>=' | '<=' | '=' | '!=' | 'contains' | 'not_contains';
  threshold_value: number;
  evaluation_window_minutes?: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  is_enabled?: boolean;
  cooldown_minutes?: number;
  notification_channels?: string[];
  notification_template?: string | null;
  last_triggered_at?: string | null;
  trigger_count?: number;
  is_triggered?: boolean;
  metadata?: Record<string, any>;
}

export interface AlertUpdate {
  name?: string;
  description?: string | null;
  alert_type?: 'threshold' | 'anomaly' | 'error_rate' | 'response_time' | 'custom';
  metric_name?: string;
  operator?: '>' | '<' | '>=' | '<=' | '=' | '!=' | 'contains' | 'not_contains';
  threshold_value?: number;
  evaluation_window_minutes?: number;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  is_enabled?: boolean;
  cooldown_minutes?: number;
  notification_channels?: string[];
  notification_template?: string | null;
  last_triggered_at?: string | null;
  trigger_count?: number;
  is_triggered?: boolean;
  metadata?: Record<string, any>;
}

// =====================================================
// PERFORMANCE METRICS TYPES
// =====================================================

export interface PerformanceMetric {
  id: string;
  tenant_id: string;
  metric_name: string;
  metric_type: 'counter' | 'gauge' | 'histogram' | 'timer';
  value: number;
  unit: string | null;
  service_name: string | null;
  endpoint: string | null;
  user_id: string | null;
  session_id: string | null;
  dimensions: Record<string, any>;
  timestamp: string;
  created_at: string;
}

export interface PerformanceMetricInsert {
  id?: string;
  tenant_id: string;
  metric_name: string;
  metric_type: 'counter' | 'gauge' | 'histogram' | 'timer';
  value: number;
  unit?: string | null;
  service_name?: string | null;
  endpoint?: string | null;
  user_id?: string | null;
  session_id?: string | null;
  dimensions?: Record<string, any>;
  timestamp?: string;
}

// =====================================================
// SUPABASE QUERY RESULT TYPES
// =====================================================

export type SystemHealthRow = SystemHealth;
export type HealthCheckRow = HealthCheck;
export type IncidentRow = Incident;
export type AlertRow = Alert;
export type PerformanceMetricRow = PerformanceMetric;

// =====================================================
// MONITORING DASHBOARD TYPES
// =====================================================

export interface MonitoringDashboard {
  system_health: SystemHealth;
  recent_health_checks: HealthCheck[];
  active_incidents: Incident[];
  triggered_alerts: Alert[];
  performance_metrics: PerformanceMetric[];
  health_score_trend: Array<{
    timestamp: string;
    score: number;
  }>;
  response_time_trend: Array<{
    timestamp: string;
    response_time: number;
  }>;
}

export interface HealthCheckSummary {
  total_checks: number;
  passing_checks: number;
  failing_checks: number;
  warning_checks: number;
  timeout_checks: number;
  average_response_time: number;
  services: Array<{
    service_name: string;
    status: 'pass' | 'fail' | 'warning' | 'timeout';
    last_check: string;
    response_time: number;
  }>;
}

export interface IncidentSummary {
  total_incidents: number;
  open_incidents: number;
  critical_incidents: number;
  average_resolution_time: number;
  recent_incidents: Incident[];
}

export interface AlertSummary {
  total_alerts: number;
  enabled_alerts: number;
  triggered_alerts: number;
  critical_alerts: number;
  recent_triggers: Alert[];
}
