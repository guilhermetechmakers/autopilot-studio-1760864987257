import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database types
export type Database = {
  public: {
    Tables: {
      system_health: {
        Row: {
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
        };
        Insert: {
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
        };
        Update: {
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
        };
      };
      health_checks: {
        Row: {
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
        };
        Insert: {
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
        };
        Update: {
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
        };
      };
      incidents: {
        Row: {
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
        };
        Insert: {
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
        };
        Update: {
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
        };
      };
      alerts: {
        Row: {
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
        };
        Insert: {
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
        };
        Update: {
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
        };
      };
      performance_metrics: {
        Row: {
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
        };
        Insert: {
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
        };
        Update: {
          metric_name?: string;
          metric_type?: 'counter' | 'gauge' | 'histogram' | 'timer';
          value?: number;
          unit?: string | null;
          service_name?: string | null;
          endpoint?: string | null;
          user_id?: string | null;
          session_id?: string | null;
          dimensions?: Record<string, any>;
          timestamp?: string;
        };
      };
    };
  };
};

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
