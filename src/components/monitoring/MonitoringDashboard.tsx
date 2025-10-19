import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database, 
  Server, 
  Zap,
  TrendingUp,
  TrendingDown,
  AlertCircle
} from 'lucide-react';
import { useMonitoringDashboard, useHealthCheckSummary, useIncidentSummary, useAlertSummary } from '@/hooks/useMonitoring';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface MonitoringDashboardProps {
  tenantId: string;
}

export function MonitoringDashboard({ tenantId }: MonitoringDashboardProps) {
  const { data: dashboard, isLoading, error } = useMonitoringDashboard(tenantId);
  const healthSummary = useHealthCheckSummary(tenantId);
  const incidentSummary = useIncidentSummary(tenantId);
  const alertSummary = useAlertSummary(tenantId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error loading monitoring data</h3>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  if (!dashboard) return null;

  const { system_health, recent_health_checks, active_incidents, triggered_alerts, health_score_trend, response_time_trend } = dashboard;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'unhealthy': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'unhealthy': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'critical': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <div className="flex items-center mt-2">
                  {getStatusIcon(system_health.status)}
                  <span className="ml-2 text-2xl font-bold text-gray-900">
                    {system_health.overall_score}%
                  </span>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(system_health.status)}`} />
            </div>
            <Progress value={system_health.overall_score} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {system_health.response_time_ms}ms
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
              <span>12% faster than yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Incidents</p>
                <p className="text-2xl font-bold text-gray-900">
                  {active_incidents.length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
            <div className="mt-4">
              <Badge variant={active_incidents.length > 0 ? 'destructive' : 'secondary'}>
                {active_incidents.length > 0 ? 'Issues Detected' : 'All Systems Operational'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Triggered Alerts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {triggered_alerts.length}
                </p>
              </div>
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-4">
              <Badge variant={triggered_alerts.length > 0 ? 'destructive' : 'secondary'}>
                {triggered_alerts.length > 0 ? 'Alerts Active' : 'No Alerts'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Score Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Health Score Trend (24h)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={health_score_trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                  formatter={(value) => [`${value}%`, 'Health Score']}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3AC569" 
                  strokeWidth={2}
                  dot={{ fill: '#3AC569', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Service Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Service Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Database className="h-5 w-5 text-blue-500 mr-3" />
                <span className="font-medium">Database</span>
              </div>
              <Badge variant={system_health.database_status === 'healthy' ? 'default' : 'destructive'}>
                {system_health.database_status}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Server className="h-5 w-5 text-green-500 mr-3" />
                <span className="font-medium">API</span>
              </div>
              <Badge variant={system_health.api_status === 'healthy' ? 'default' : 'destructive'}>
                {system_health.api_status}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-purple-500 mr-3" />
                <span className="font-medium">Integrations</span>
              </div>
              <Badge variant={system_health.integrations_status === 'healthy' ? 'default' : 'destructive'}>
                {system_health.integrations_status}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-orange-500 mr-3" />
                <span className="font-medium">Background Jobs</span>
              </div>
              <Badge variant={system_health.background_jobs_status === 'healthy' ? 'default' : 'destructive'}>
                {system_health.background_jobs_status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Health Check Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{healthSummary.passing_checks}</p>
                <p className="text-sm text-gray-600">Passing</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{healthSummary.failing_checks}</p>
                <p className="text-sm text-gray-600">Failing</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">Average Response Time</p>
              <p className="text-lg font-semibold">{Math.round(healthSummary.average_response_time)}ms</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Health Checks */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Health Checks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recent_health_checks.slice(0, 5).map((check) => (
              <div key={check.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  {check.status === 'pass' ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                  )}
                  <div>
                    <p className="font-medium">{check.check_name}</p>
                    <p className="text-sm text-gray-600">{check.service_name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{check.response_time_ms}ms</p>
                  <p className="text-xs text-gray-500">
                    {new Date(check.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Incidents */}
      {active_incidents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertCircle className="h-5 w-5 mr-2" />
              Active Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {active_incidents.map((incident) => (
                <div key={incident.id} className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-red-900">{incident.title}</h4>
                      <p className="text-sm text-red-700 mt-1">{incident.description}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <Badge variant="destructive">{incident.severity}</Badge>
                        <Badge variant="outline">{incident.status}</Badge>
                        <span className="text-xs text-gray-500">
                          Started {new Date(incident.started_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Triggered Alerts */}
      {triggered_alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-600">
              <Zap className="h-5 w-5 mr-2" />
              Triggered Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {triggered_alerts.map((alert) => (
                <div key={alert.id} className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-yellow-900">{alert.name}</h4>
                      <p className="text-sm text-yellow-700 mt-1">{alert.description}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <Badge variant="outline">{alert.severity}</Badge>
                        <span className="text-xs text-gray-500">
                          Triggered {alert.last_triggered_at ? new Date(alert.last_triggered_at).toLocaleString() : 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
