import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, CheckCircle, AlertCircle, Info } from "lucide-react";

export default function NotificationsPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Notifications Center</h1>
            <p className="text-text-secondary">Manage in-app and email notifications</p>
          </div>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="card">
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      type: "success", 
                      title: "Project milestone completed", 
                      message: "E-commerce Platform - Frontend Development milestone has been completed",
                      time: "2 hours ago",
                      icon: CheckCircle
                    },
                    { 
                      type: "warning", 
                      title: "Deadline approaching", 
                      message: "Mobile App Redesign project deadline is in 2 days",
                      time: "4 hours ago",
                      icon: AlertCircle
                    },
                    { 
                      type: "info", 
                      title: "New client signed", 
                      message: "DataFlow Ltd. has signed the contract for AI Integration project",
                      time: "6 hours ago",
                      icon: Info
                    },
                    { 
                      type: "success", 
                      title: "Invoice paid", 
                      message: "Invoice #INV-2024-001 has been paid by TechCorp Inc.",
                      time: "1 day ago",
                      icon: CheckCircle
                    }
                  ].map((notification, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl border border-border-divider">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        notification.type === 'success' ? 'bg-positive/10' :
                        notification.type === 'warning' ? 'bg-chart-orange/10' :
                        'bg-accent/10'
                      }`}>
                        <notification.icon className={`h-4 w-4 ${
                          notification.type === 'success' ? 'text-positive' :
                          notification.type === 'warning' ? 'text-chart-orange' :
                          'text-accent'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary">{notification.title}</h3>
                        <p className="text-sm text-text-secondary mt-1">{notification.message}</p>
                        <p className="text-xs text-text-secondary mt-2">{notification.time}</p>
                      </div>
                      <Badge variant="outline">Unread</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="card">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">Email Notifications</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">Push Notifications</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">SMS Alerts</span>
                  <Badge variant="outline">Disabled</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </CardContent>
            </Card>

            <Card className="card">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Unread</span>
                  <span className="font-semibold text-text-primary">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">This Week</span>
                  <span className="font-semibold text-text-primary">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">This Month</span>
                  <span className="font-semibold text-text-primary">89</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}