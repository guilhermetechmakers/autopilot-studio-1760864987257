import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Users, Shield, BarChart3, FileText } from "lucide-react";

export default function AdminPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
            <p className="text-text-secondary">Tenant and system administration, templates, audit logs</p>
          </div>
          <Button className="btn-primary">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Active Users", value: "156", icon: Users, color: "text-accent" },
            { title: "System Health", value: "99.9%", icon: Shield, color: "text-positive" },
            { title: "API Calls", value: "12.5K", icon: BarChart3, color: "text-chart-orange" },
            { title: "Audit Logs", value: "2.3K", icon: FileText, color: "text-text-secondary" }
          ].map((stat, index) => (
            <Card key={index} className="card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">{stat.title}</p>
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "John Doe", role: "Admin", status: "active", lastActive: "2 hours ago" },
                  { name: "Sarah Smith", role: "PM", status: "active", lastActive: "1 day ago" },
                  { name: "Mike Johnson", role: "Developer", status: "inactive", lastActive: "1 week ago" }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border-divider">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-accent">{user.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{user.name}</p>
                        <p className="text-sm text-text-secondary">{user.role} • {user.lastActive}</p>
                      </div>
                    </div>
                    <Badge variant={user.status === 'active' ? 'default' : 'outline'}>
                      {user.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">API Server</span>
                  <Badge variant="default">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Database</span>
                  <Badge variant="default">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">File Storage</span>
                  <Badge variant="default">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Email Service</span>
                  <Badge variant="secondary">Warning</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">AI Services</span>
                  <Badge variant="default">Healthy</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}