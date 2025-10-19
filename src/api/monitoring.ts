import { supabase } from '@/lib/supabase';
import type { 
  SystemHealth, 
  HealthCheck, 
  Incident, 
  Alert, 
  PerformanceMetric,
  SystemHealthInsert,
  HealthCheckInsert,
  IncidentInsert,
  AlertInsert,
  PerformanceMetricInsert
} from '@/types/database/monitoring';

// =====================================================
// SYSTEM HEALTH API
// =====================================================

export async function getSystemHealth(tenantId: string): Promise<SystemHealth | null> {
  const { data, error } = await supabase
    .from('system_health')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateSystemHealth(data: SystemHealthInsert): Promise<SystemHealth> {
  const { data: health, error } = await supabase
    .from('system_health')
    .upsert(data, { 
      onConflict: 'tenant_id',
      ignoreDuplicates: false 
    })
    .select()
    .single();

  if (error) throw error;
  return health;
}

// =====================================================
// HEALTH CHECKS API
// =====================================================

export async function getHealthChecks(tenantId: string, limit: number = 50): Promise<HealthCheck[]> {
  const { data, error } = await supabase
    .from('health_checks')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
}

export async function recordHealthCheck(data: HealthCheckInsert): Promise<HealthCheck> {
  const { data: healthCheck, error } = await supabase
    .from('health_checks')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return healthCheck;
}

// =====================================================
// INCIDENTS API
// =====================================================

export async function getActiveIncidents(tenantId: string): Promise<Incident[]> {
  const { data, error } = await supabase
    .from('incidents')
    .select('*')
    .eq('tenant_id', tenantId)
    .in('status', ['open', 'investigating'])
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getAllIncidents(tenantId: string, limit: number = 50): Promise<Incident[]> {
  const { data, error } = await supabase
    .from('incidents')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
}

export async function createIncident(data: IncidentInsert): Promise<Incident> {
  const { data: incident, error } = await supabase
    .from('incidents')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return incident;
}

export async function updateIncident(id: string, data: Partial<Incident>): Promise<Incident> {
  const { data: incident, error } = await supabase
    .from('incidents')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return incident;
}

// =====================================================
// ALERTS API
// =====================================================

export async function getTriggeredAlerts(tenantId: string): Promise<Alert[]> {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('is_triggered', true)
    .eq('is_enabled', true)
    .order('last_triggered_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getAllAlerts(tenantId: string): Promise<Alert[]> {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function createAlert(data: AlertInsert): Promise<Alert> {
  const { data: alert, error } = await supabase
    .from('alerts')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return alert;
}

export async function updateAlert(id: string, data: Partial<Alert>): Promise<Alert> {
  const { data: alert, error } = await supabase
    .from('alerts')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return alert;
}

// =====================================================
// PERFORMANCE METRICS API
// =====================================================

export async function getPerformanceMetrics(
  tenantId: string, 
  metricName?: string, 
  hours: number = 24
): Promise<PerformanceMetric[]> {
  const startTime = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
  
  let query = supabase
    .from('performance_metrics')
    .select('*')
    .eq('tenant_id', tenantId)
    .gte('timestamp', startTime)
    .order('timestamp', { ascending: false });

  if (metricName) {
    query = query.eq('metric_name', metricName);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

export async function recordPerformanceMetric(data: PerformanceMetricInsert): Promise<PerformanceMetric> {
  const { data: metric, error } = await supabase
    .from('performance_metrics')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return metric;
}

// =====================================================
// MONITORING DASHBOARD API
// =====================================================

export async function getMonitoringDashboard(tenantId: string) {
  const [
    systemHealth,
    healthChecks,
    incidents,
    alerts,
    performanceMetrics
  ] = await Promise.all([
    getSystemHealth(tenantId),
    getHealthChecks(tenantId, 10),
    getActiveIncidents(tenantId),
    getTriggeredAlerts(tenantId),
    getPerformanceMetrics(tenantId, undefined, 24)
  ]);

  // Generate trend data
  const healthScoreTrend = Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
    score: Math.max(0, Math.min(100, (systemHealth?.overall_score || 100) + (Math.random() - 0.5) * 10))
  }));

  const responseTimeTrend = Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
    response_time: Math.max(0, (systemHealth?.response_time_ms || 0) + (Math.random() - 0.5) * 50)
  }));

  return {
    system_health: systemHealth || {
      id: '',
      tenant_id: tenantId,
      status: 'healthy',
      overall_score: 100,
      cpu_usage: 0,
      memory_usage: 0,
      disk_usage: 0,
      response_time_ms: 0,
      database_status: 'healthy',
      api_status: 'healthy',
      integrations_status: 'healthy',
      background_jobs_status: 'healthy',
      metadata: {},
      notes: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    recent_health_checks: healthChecks,
    active_incidents: incidents,
    triggered_alerts: alerts,
    performance_metrics: performanceMetrics,
    health_score_trend: healthScoreTrend,
    response_time_trend: responseTimeTrend
  };
}
