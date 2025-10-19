import React from 'react';
import * as Sentry from '@sentry/react';
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
// SENTRY CONFIGURATION
// =====================================================

export function initializeSentry() {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    // Performance Monitoring
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

// =====================================================
// MONITORING SERVICE
// =====================================================

export class MonitoringService {
  private static instance: MonitoringService;
  private healthCheckInterval: number | null = null;
  private metricsInterval: number | null = null;

  private constructor() {
    this.initializeHealthChecks();
    this.initializeMetricsCollection();
  }

  public static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  // =====================================================
  // SYSTEM HEALTH MANAGEMENT
  // =====================================================

  async updateSystemHealth(data: SystemHealthInsert): Promise<SystemHealth> {
    try {
      const { data: health, error } = await supabase
        .from('system_health')
        .upsert(data, { 
          onConflict: 'tenant_id',
          ignoreDuplicates: false 
        })
        .select()
        .single();

      if (error) throw error;

      // Send to Sentry if health is degraded
      if (health.status === 'degraded' || health.status === 'unhealthy' || health.status === 'critical') {
        Sentry.captureMessage(`System health degraded: ${health.status}`, 'warning');
      }

      return health;
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  async getSystemHealth(tenantId: string): Promise<SystemHealth | null> {
    try {
      const { data, error } = await supabase
        .from('system_health')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  // =====================================================
  // HEALTH CHECKS
  // =====================================================

  private async initializeHealthChecks() {
    // Run health checks every 30 seconds
    this.healthCheckInterval = setInterval(async () => {
      await this.runHealthChecks();
    }, 30000);

    // Run initial health check
    await this.runHealthChecks();
  }

  private async runHealthChecks() {
    const checks = [
      this.checkDatabaseHealth(),
      this.checkApiHealth(),
      this.checkIntegrationsHealth(),
      this.checkBackgroundJobsHealth(),
    ];

    await Promise.allSettled(checks);
  }

  private async checkDatabaseHealth(): Promise<void> {
    const startTime = Date.now();
    try {
      const { error } = await supabase
        .from('system_health')
        .select('id')
        .limit(1);

      const responseTime = Date.now() - startTime;
      
      await this.recordHealthCheck({
        tenant_id: 'system',
        check_name: 'database_connection',
        service_name: 'supabase',
        check_type: 'database',
        status: error ? 'fail' : 'pass',
        response_time_ms: responseTime,
        error_message: error?.message || null,
        metadata: { 
          operation: 'select_test',
          table: 'system_health'
        }
      });
    } catch (error) {
      await this.recordHealthCheck({
        tenant_id: 'system',
        check_name: 'database_connection',
        service_name: 'supabase',
        check_type: 'database',
        status: 'fail',
        response_time_ms: Date.now() - startTime,
        error_message: error instanceof Error ? error.message : 'Unknown error',
        metadata: { 
          operation: 'select_test',
          table: 'system_health'
        }
      });
    }
  }

  private async checkApiHealth(): Promise<void> {
    const startTime = Date.now();
    try {
      // Check if API is responsive
      const response = await fetch('/api/health', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const responseTime = Date.now() - startTime;
      
      await this.recordHealthCheck({
        tenant_id: 'system',
        check_name: 'api_health',
        service_name: 'api',
        check_type: 'api',
        status: response.ok ? 'pass' : 'fail',
        response_time_ms: responseTime,
        status_code: response.status,
        endpoint_url: '/api/health',
        metadata: { 
          method: 'GET',
          status_text: response.statusText
        }
      });
    } catch (error) {
      await this.recordHealthCheck({
        tenant_id: 'system',
        check_name: 'api_health',
        service_name: 'api',
        check_type: 'api',
        status: 'fail',
        response_time_ms: Date.now() - startTime,
        error_message: error instanceof Error ? error.message : 'Unknown error',
        endpoint_url: '/api/health',
        metadata: { 
          method: 'GET'
        }
      });
    }
  }

  private async checkIntegrationsHealth(): Promise<void> {
    // Check external integrations
    const integrations = [
      { name: 'github', url: 'https://api.github.com' },
      { name: 'vercel', url: 'https://api.vercel.com' },
      { name: 'quickbooks', url: 'https://sandbox-quickbooks.api.intuit.com' },
    ];

    for (const integration of integrations) {
      await this.checkExternalService(integration.name, integration.url);
    }
  }

  private async checkExternalService(serviceName: string, url: string): Promise<void> {
    const startTime = Date.now();
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });

      const responseTime = Date.now() - startTime;
      
      await this.recordHealthCheck({
        tenant_id: 'system',
        check_name: `${serviceName}_health`,
        service_name: serviceName,
        check_type: 'external_service',
        status: response.ok ? 'pass' : 'fail',
        response_time_ms: responseTime,
        status_code: response.status,
        endpoint_url: url,
        metadata: { 
          method: 'HEAD',
          status_text: response.statusText
        }
      });
    } catch (error) {
      await this.recordHealthCheck({
        tenant_id: 'system',
        check_name: `${serviceName}_health`,
        service_name: serviceName,
        check_type: 'external_service',
        status: 'timeout',
        response_time_ms: Date.now() - startTime,
        error_message: error instanceof Error ? error.message : 'Unknown error',
        endpoint_url: url,
        metadata: { 
          method: 'HEAD'
        }
      });
    }
  }

  private async checkBackgroundJobsHealth(): Promise<void> {
    // Check if background job queue is healthy
    const startTime = Date.now();
    try {
      // This would check your background job system
      // For now, we'll simulate a check
      const responseTime = Date.now() - startTime;
      
      await this.recordHealthCheck({
        tenant_id: 'system',
        check_name: 'background_jobs_health',
        service_name: 'background_jobs',
        check_type: 'background_job',
        status: 'pass',
        response_time_ms: responseTime,
        metadata: { 
          queue_status: 'healthy',
          pending_jobs: 0
        }
      });
    } catch (error) {
      await this.recordHealthCheck({
        tenant_id: 'system',
        check_name: 'background_jobs_health',
        service_name: 'background_jobs',
        check_type: 'background_job',
        status: 'fail',
        response_time_ms: Date.now() - startTime,
        error_message: error instanceof Error ? error.message : 'Unknown error',
        metadata: { 
          queue_status: 'unhealthy'
        }
      });
    }
  }

  async recordHealthCheck(data: HealthCheckInsert): Promise<HealthCheck> {
    try {
      const { data: healthCheck, error } = await supabase
        .from('health_checks')
        .insert(data)
        .select()
        .single();

      if (error) throw error;

      // Send to Sentry if health check fails
      if (healthCheck.status === 'fail' || healthCheck.status === 'timeout') {
        Sentry.captureMessage(`Health check failed: ${healthCheck.check_name}`, {
          level: 'error',
          extra: {
            service: healthCheck.service_name,
            responseTime: healthCheck.response_time_ms,
            error: healthCheck.error_message
          }
        });
      }

      return healthCheck;
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  // =====================================================
  // INCIDENT MANAGEMENT
  // =====================================================

  async createIncident(data: IncidentInsert): Promise<Incident> {
    try {
      const { data: incident, error } = await supabase
        .from('incidents')
        .insert(data)
        .select()
        .single();

      if (error) throw error;

      // Send to Sentry for critical incidents
      if (incident.severity === 'critical') {
        Sentry.captureMessage(`Critical incident: ${incident.title}`, {
          level: 'fatal',
          extra: {
            incidentId: incident.id,
            affectedServices: incident.affected_services,
            businessImpact: incident.business_impact
          }
        });
      }

      return incident;
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  async updateIncident(id: string, data: Partial<Incident>): Promise<Incident> {
    try {
      const { data: incident, error } = await supabase
        .from('incidents')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return incident;
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  async getActiveIncidents(tenantId: string): Promise<Incident[]> {
    try {
      const { data, error } = await supabase
        .from('incidents')
        .select('*')
        .eq('tenant_id', tenantId)
        .in('status', ['open', 'investigating'])
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  // =====================================================
  // ALERT MANAGEMENT
  // =====================================================

  async createAlert(data: AlertInsert): Promise<Alert> {
    try {
      const { data: alert, error } = await supabase
        .from('alerts')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return alert;
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  async updateAlert(id: string, data: Partial<Alert>): Promise<Alert> {
    try {
      const { data: alert, error } = await supabase
        .from('alerts')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return alert;
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  async getTriggeredAlerts(tenantId: string): Promise<Alert[]> {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('tenant_id', tenantId)
        .eq('is_triggered', true)
        .eq('is_enabled', true)
        .order('last_triggered_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  // =====================================================
  // PERFORMANCE METRICS
  // =====================================================

  private async initializeMetricsCollection() {
    // Collect performance metrics every 60 seconds
    this.metricsInterval = setInterval(async () => {
      await this.collectPerformanceMetrics();
    }, 60000);

    // Collect initial metrics
    await this.collectPerformanceMetrics();
  }

  private async collectPerformanceMetrics() {
    try {
      // Collect browser performance metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const metrics = [
        {
          tenant_id: 'system',
          metric_name: 'page_load_time',
          metric_type: 'timer' as const,
          value: navigation.loadEventEnd - navigation.loadEventStart,
          unit: 'ms',
          service_name: 'frontend',
          dimensions: {
            url: window.location.href,
            user_agent: navigator.userAgent
          }
        },
        {
          tenant_id: 'system',
          metric_name: 'first_contentful_paint',
          metric_type: 'timer' as const,
          value: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
          unit: 'ms',
          service_name: 'frontend',
          dimensions: {
            url: window.location.href
          }
        },
        {
          tenant_id: 'system',
          metric_name: 'memory_usage',
          metric_type: 'gauge' as const,
          value: (performance as any).memory?.usedJSHeapSize || 0,
          unit: 'bytes',
          service_name: 'frontend',
          dimensions: {
            url: window.location.href
          }
        }
      ];

      for (const metric of metrics) {
        await this.recordPerformanceMetric(metric);
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async recordPerformanceMetric(data: PerformanceMetricInsert): Promise<PerformanceMetric> {
    try {
      const { data: metric, error } = await supabase
        .from('performance_metrics')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return metric;
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  async getPerformanceMetrics(
    tenantId: string, 
    metricName?: string, 
    hours: number = 24
  ): Promise<PerformanceMetric[]> {
    try {
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
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  // =====================================================
  // CLEANUP
  // =====================================================

  destroy() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval);
    }
  }
}

// =====================================================
// ERROR BOUNDARY COMPONENT
// =====================================================

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              We're sorry, but something unexpected happened. Our team has been notified.
            </p>
            <button
              onClick={resetError}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      )}
      beforeCapture={(scope) => {
        scope.setTag('errorBoundary', true);
      }}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

export function captureException(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, { extra: context });
}

export function captureMessage(message: string, level: 'debug' | 'info' | 'warning' | 'error' | 'fatal' = 'info', context?: Record<string, any>) {
  Sentry.captureMessage(message, { level, extra: context });
}

export function setUserContext(user: { id: string; email?: string; username?: string }) {
  Sentry.setUser(user);
}

export function addBreadcrumb(message: string, category: string, level: 'debug' | 'info' | 'warning' | 'error' | 'fatal' = 'info', data?: Record<string, any>) {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    data
  });
}

// =====================================================
// INITIALIZATION
// =====================================================

// Initialize monitoring when module is imported
if (typeof window !== 'undefined') {
  initializeSentry();
  MonitoringService.getInstance();
}
