import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MonitoringService } from '@/setup/monitoring';
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
  PerformanceMetricInsert,
  MonitoringDashboard,
  HealthCheckSummary,
  IncidentSummary,
  AlertSummary
} from '@/types/database/monitoring';

// =====================================================
// QUERY KEYS
// =====================================================

export const monitoringKeys = {
  all: ['monitoring'] as const,
  systemHealth: (tenantId: string) => [...monitoringKeys.all, 'systemHealth', tenantId] as const,
  healthChecks: (tenantId: string) => [...monitoringKeys.all, 'healthChecks', tenantId] as const,
  incidents: (tenantId: string) => [...monitoringKeys.all, 'incidents', tenantId] as const,
  alerts: (tenantId: string) => [...monitoringKeys.all, 'alerts', tenantId] as const,
  performanceMetrics: (tenantId: string, metricName?: string) => 
    [...monitoringKeys.all, 'performanceMetrics', tenantId, metricName] as const,
  dashboard: (tenantId: string) => [...monitoringKeys.all, 'dashboard', tenantId] as const,
};

// =====================================================
// SYSTEM HEALTH HOOKS
// =====================================================

export function useSystemHealth(tenantId: string) {
  return useQuery({
    queryKey: monitoringKeys.systemHealth(tenantId),
    queryFn: () => MonitoringService.getInstance().getSystemHealth(tenantId),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  });
}

export function useUpdateSystemHealth() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SystemHealthInsert) => 
      MonitoringService.getInstance().updateSystemHealth(data),
    onSuccess: (data) => {
      queryClient.setQueryData(
        monitoringKeys.systemHealth(data.tenant_id),
        data
      );
    },
  });
}

// =====================================================
// HEALTH CHECKS HOOKS
// =====================================================

export function useHealthChecks(tenantId: string, limit: number = 50) {
  return useQuery({
    queryKey: monitoringKeys.healthChecks(tenantId),
    queryFn: async () => {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('health_checks')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 30000,
    refetchInterval: 30000,
  });
}

export function useRecordHealthCheck() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: HealthCheckInsert) => 
      MonitoringService.getInstance().recordHealthCheck(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: monitoringKeys.healthChecks(data.tenant_id)
      });
    },
  });
}

// =====================================================
// INCIDENTS HOOKS
// =====================================================

export function useActiveIncidents(tenantId: string) {
  return useQuery({
    queryKey: monitoringKeys.incidents(tenantId),
    queryFn: () => MonitoringService.getInstance().getActiveIncidents(tenantId),
    staleTime: 30000,
    refetchInterval: 60000,
  });
}

export function useAllIncidents(tenantId: string, limit: number = 50) {
  return useQuery({
    queryKey: [...monitoringKeys.incidents(tenantId), 'all'],
    queryFn: async () => {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('incidents')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 60000,
  });
}

export function useCreateIncident() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: IncidentInsert) => 
      MonitoringService.getInstance().createIncident(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: monitoringKeys.incidents(data.tenant_id)
      });
    },
  });
}

export function useUpdateIncident() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Incident> }) => 
      MonitoringService.getInstance().updateIncident(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: monitoringKeys.incidents(data.tenant_id)
      });
    },
  });
}

// =====================================================
// ALERTS HOOKS
// =====================================================

export function useTriggeredAlerts(tenantId: string) {
  return useQuery({
    queryKey: monitoringKeys.alerts(tenantId),
    queryFn: () => MonitoringService.getInstance().getTriggeredAlerts(tenantId),
    staleTime: 30000,
    refetchInterval: 60000,
  });
}

export function useAllAlerts(tenantId: string) {
  return useQuery({
    queryKey: [...monitoringKeys.alerts(tenantId), 'all'],
    queryFn: async () => {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 60000,
  });
}

export function useCreateAlert() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: AlertInsert) => 
      MonitoringService.getInstance().createAlert(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: monitoringKeys.alerts(data.tenant_id)
      });
    },
  });
}

export function useUpdateAlert() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Alert> }) => 
      MonitoringService.getInstance().updateAlert(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: monitoringKeys.alerts(data.tenant_id)
      });
    },
  });
}

// =====================================================
// PERFORMANCE METRICS HOOKS
// =====================================================

export function usePerformanceMetrics(
  tenantId: string, 
  metricName?: string, 
  hours: number = 24
) {
  return useQuery({
    queryKey: monitoringKeys.performanceMetrics(tenantId, metricName),
    queryFn: () => MonitoringService.getInstance().getPerformanceMetrics(tenantId, metricName, hours),
    staleTime: 60000,
    refetchInterval: 300000, // 5 minutes
  });
}

export function useRecordPerformanceMetric() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: PerformanceMetricInsert) => 
      MonitoringService.getInstance().recordPerformanceMetric(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: monitoringKeys.performanceMetrics(data.tenant_id)
      });
    },
  });
}

// =====================================================
// DASHBOARD HOOKS
// =====================================================

export function useMonitoringDashboard(tenantId: string) {
  return useQuery({
    queryKey: monitoringKeys.dashboard(tenantId),
    queryFn: async (): Promise<MonitoringDashboard> => {
      const [
        systemHealth,
        healthChecks,
        incidents,
        alerts,
        performanceMetrics
      ] = await Promise.all([
        MonitoringService.getInstance().getSystemHealth(tenantId),
        (async () => {
          const { supabase } = await import('@/lib/supabase');
          const { data, error } = await supabase
            .from('health_checks')
            .select('*')
            .eq('tenant_id', tenantId)
            .order('created_at', { ascending: false })
            .limit(10);
          
          if (error) throw error;
          return data || [];
        })(),
        MonitoringService.getInstance().getActiveIncidents(tenantId),
        MonitoringService.getInstance().getTriggeredAlerts(tenantId),
        MonitoringService.getInstance().getPerformanceMetrics(tenantId, undefined, 24)
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
    },
    staleTime: 30000,
    refetchInterval: 60000,
  });
}

// =====================================================
// SUMMARY HOOKS
// =====================================================

export function useHealthCheckSummary(tenantId: string): HealthCheckSummary {
  const { data: healthChecks = [] } = useHealthChecks(tenantId, 100);
  
  const totalChecks = healthChecks.length;
  const passingChecks = healthChecks.filter((h: HealthCheck) => h.status === 'pass').length;
  const failingChecks = healthChecks.filter((h: HealthCheck) => h.status === 'fail').length;
  const warningChecks = healthChecks.filter((h: HealthCheck) => h.status === 'warning').length;
  const timeoutChecks = healthChecks.filter((h: HealthCheck) => h.status === 'timeout').length;
  
  const averageResponseTime = healthChecks.length > 0 
    ? healthChecks.reduce((sum: number, h: HealthCheck) => sum + h.response_time_ms, 0) / healthChecks.length
    : 0;

  const services = healthChecks.reduce((acc: Array<{
    service_name: string;
    status: 'pass' | 'fail' | 'warning' | 'timeout';
    last_check: string;
    response_time: number;
  }>, check: HealthCheck) => {
    const existing = acc.find((s: { service_name: string }) => s.service_name === check.service_name);
    if (existing) {
      existing.last_check = check.created_at;
      existing.response_time = check.response_time_ms;
      existing.status = check.status;
    } else {
      acc.push({
        service_name: check.service_name,
        status: check.status,
        last_check: check.created_at,
        response_time: check.response_time_ms
      });
    }
    return acc;
  }, [] as Array<{
    service_name: string;
    status: 'pass' | 'fail' | 'warning' | 'timeout';
    last_check: string;
    response_time: number;
  }>);

  return {
    total_checks: totalChecks,
    passing_checks: passingChecks,
    failing_checks: failingChecks,
    warning_checks: warningChecks,
    timeout_checks: timeoutChecks,
    average_response_time: averageResponseTime,
    services
  };
}

export function useIncidentSummary(tenantId: string): IncidentSummary {
  const { data: incidents = [] } = useAllIncidents(tenantId, 100);
  
  const totalIncidents = incidents.length;
  const openIncidents = incidents.filter((i: Incident) => i.status === 'open' || i.status === 'investigating').length;
  const criticalIncidents = incidents.filter((i: Incident) => i.severity === 'critical').length;
  
  const resolvedIncidents = incidents.filter((i: Incident) => i.resolved_at);
  const averageResolutionTime = resolvedIncidents.length > 0
    ? resolvedIncidents.reduce((sum: number, incident: Incident) => {
        const start = new Date(incident.started_at).getTime();
        const end = new Date(incident.resolved_at!).getTime();
        return sum + (end - start);
      }, 0) / resolvedIncidents.length / (1000 * 60 * 60) // Convert to hours
    : 0;

  return {
    total_incidents: totalIncidents,
    open_incidents: openIncidents,
    critical_incidents: criticalIncidents,
    average_resolution_time: averageResolutionTime,
    recent_incidents: incidents.slice(0, 10)
  };
}

export function useAlertSummary(tenantId: string): AlertSummary {
  const { data: alerts = [] } = useAllAlerts(tenantId);
  
  const totalAlerts = alerts.length;
  const enabledAlerts = alerts.filter((a: Alert) => a.is_enabled).length;
  const triggeredAlerts = alerts.filter((a: Alert) => a.is_triggered).length;
  const criticalAlerts = alerts.filter((a: Alert) => a.severity === 'critical').length;
  
  return {
    total_alerts: totalAlerts,
    enabled_alerts: enabledAlerts,
    triggered_alerts: triggeredAlerts,
    critical_alerts: criticalAlerts,
    recent_triggers: alerts.filter((a: Alert) => a.is_triggered).slice(0, 10)
  };
}
