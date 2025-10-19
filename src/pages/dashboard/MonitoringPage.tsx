import React, { useState } from 'react';
import { MonitoringDashboard } from '@/components/monitoring/MonitoringDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Settings, 
  AlertTriangle, 
  BarChart3, 
  Shield, 
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Server,
  Database,
  Globe,
  Edit,
  BellOff,
  Plus
} from 'lucide-react';
import { useMonitoringDashboard, useHealthCheckSummary, useIncidentSummary, useAlertSummary } from '@/hooks/useMonitoring';

export function MonitoringPage() {
  // In a real app, this would come from auth context
  const tenantId = 'current-user-id';
  const [activeTab, setActiveTab] = useState('overview');

  const { data: dashboard, isLoading: dashboardLoading } = useMonitoringDashboard(tenantId);
  const healthSummary = useHealthCheckSummary(tenantId);
  const incidentSummary = useIncidentSummary(tenantId);
  const alertSummary = useAlertSummary(tenantId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'degraded': return 'text-yellow-600';
      case 'unhealthy': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'unhealthy': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'critical': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Monitoring</h1>
          <p className="text-gray-600 mt-2">
            Monitor system health, performance, and incidents in real-time
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Create Alert
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">System Status</p>
                <div className="flex items-center">
                  {dashboard ? getStatusIcon(dashboard.system_health.status) : <Activity className="h-5 w-5 text-gray-500" />}
                  <span className={`ml-2 text-2xl font-bold ${dashboard ? getStatusColor(dashboard.system_health.status) : 'text-gray-600'}`}>
                    {dashboard ? dashboard.system_health.status.toUpperCase() : 'LOADING'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Health Score</p>
                <p className="text-2xl font-bold text-blue-600">
                  {dashboard ? `${dashboard.system_health.overall_score}%` : '--'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Incidents</p>
                <p className="text-2xl font-bold text-orange-600">
                  {incidentSummary.open_incidents}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Triggered Alerts</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {alertSummary.triggered_alerts}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Health Checks
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="incidents" className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Incidents
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center">
            <Zap className="h-4 w-4 mr-2" />
            Alerts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <MonitoringDashboard tenantId={tenantId} />
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Service Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-blue-500 mr-3" />
                    <span className="font-medium">Database</span>
                  </div>
                  <Badge variant={dashboard?.system_health.database_status === 'healthy' ? 'default' : 'destructive'}>
                    {dashboard?.system_health.database_status || 'Unknown'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Server className="h-5 w-5 text-green-500 mr-3" />
                    <span className="font-medium">API</span>
                  </div>
                  <Badge variant={dashboard?.system_health.api_status === 'healthy' ? 'default' : 'destructive'}>
                    {dashboard?.system_health.api_status || 'Unknown'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-purple-500 mr-3" />
                    <span className="font-medium">Integrations</span>
                  </div>
                  <Badge variant={dashboard?.system_health.integrations_status === 'healthy' ? 'default' : 'destructive'}>
                    {dashboard?.system_health.integrations_status || 'Unknown'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 text-orange-500 mr-3" />
                    <span className="font-medium">Background Jobs</span>
                  </div>
                  <Badge variant={dashboard?.system_health.background_jobs_status === 'healthy' ? 'default' : 'destructive'}>
                    {dashboard?.system_health.background_jobs_status || 'Unknown'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
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
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {dashboard ? `${dashboard.system_health.response_time_ms}ms` : '--'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">CPU Usage</p>
                    <p className="text-2xl font-bold text-green-600">
                      {dashboard ? `${dashboard.system_health.cpu_usage}%` : '--'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Database className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Memory Usage</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {dashboard ? `${dashboard.system_health.memory_usage}%` : '--'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Server className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Disk Usage</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {dashboard ? `${dashboard.system_health.disk_usage}%` : '--'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Monitoring</h3>
                <p className="text-gray-600">Detailed performance metrics and charts will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Active Incidents
              </CardTitle>
            </CardHeader>
            <CardContent>
              {incidentSummary.open_incidents === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Incidents</h3>
                  <p className="text-gray-600">All systems are operating normally.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {incidentSummary.recent_incidents.slice(0, 5).map((incident) => (
                    <div key={incident.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{incident.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{alertSummary.total_alerts}</p>
                  <p className="text-sm text-gray-600">Total Alerts</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{alertSummary.enabled_alerts}</p>
                  <p className="text-sm text-gray-600">Enabled</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{alertSummary.triggered_alerts}</p>
                  <p className="text-sm text-gray-600">Triggered</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Alert Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              {alertSummary.triggered_alerts === 0 ? (
                <div className="text-center py-8">
                  <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Triggered Alerts</h3>
                  <p className="text-gray-600">All alert conditions are within normal ranges.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {alertSummary.recent_triggers.slice(0, 5).map((alert) => (
                    <div key={alert.id} className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-yellow-900">{alert.name}</h4>
                          <p className="text-sm text-yellow-700 mt-1">{alert.description}</p>
                          <div className="flex items-center mt-2 space-x-4">
                            <Badge variant="outline">{alert.severity}</Badge>
                            <Badge variant="outline">{alert.alert_type}</Badge>
                            <span className="text-xs text-gray-500">
                              Triggered {alert.last_triggered_at ? new Date(alert.last_triggered_at).toLocaleString() : 'Unknown'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <BellOff className="h-4 w-4 mr-1" />
                            Disable
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Alert Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Alert Configuration</h3>
                <p className="text-gray-600 mb-4">Configure alert rules and notification settings.</p>
                <Button className="flex items-center mx-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
