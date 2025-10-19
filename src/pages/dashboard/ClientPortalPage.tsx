import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, CheckCircle, Clock } from "lucide-react";

export default function ClientPortalPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Client Portal</h1>
            <p className="text-text-secondary">External client-facing view for approvals and assets</p>
          </div>
          <Button className="btn-primary">
            <Users className="h-4 w-4 mr-2" />
            Invite Client
          </Button>
        </div>

        <Card className="card">
          <CardHeader>
            <CardTitle>Project Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-text-primary mb-2">E-commerce Platform</h3>
                <p className="text-text-secondary">TechCorp Inc.</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Status</p>
                <Badge variant="default">In Progress</Badge>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Progress</p>
                <p className="font-semibold text-text-primary">65% Complete</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card">
            <CardHeader>
              <CardTitle>Deliverables & Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "UI/UX Design Mockups", status: "approved", date: "Feb 5, 2024" },
                  { name: "Database Schema", status: "pending", date: "Feb 10, 2024" },
                  { name: "API Documentation", status: "in-review", date: "Feb 12, 2024" },
                  { name: "Frontend Prototype", status: "pending", date: "Feb 15, 2024" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border-divider">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-text-secondary" />
                      <div>
                        <p className="font-medium text-text-primary">{item.name}</p>
                        <p className="text-sm text-text-secondary">Due: {item.date}</p>
                      </div>
                    </div>
                    <Badge variant={
                      item.status === 'approved' ? 'default' :
                      item.status === 'in-review' ? 'secondary' : 'outline'
                    }>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Design mockups approved", time: "2 hours ago", icon: CheckCircle },
                  { action: "New comment on API docs", time: "4 hours ago", icon: FileText },
                  { action: "Meeting scheduled", time: "1 day ago", icon: Clock },
                  { action: "Project milestone updated", time: "2 days ago", icon: CheckCircle }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <activity.icon className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">{activity.action}</p>
                      <p className="text-xs text-text-secondary">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}