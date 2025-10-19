import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Rocket, CheckCircle, Clock, ExternalLink } from "lucide-react";

export default function LaunchPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Launch & Deploy</h1>
            <p className="text-text-secondary">Orchestrate launch checklists, deploy, and publish release notes</p>
          </div>
          <Button className="btn-primary">
            <Rocket className="h-4 w-4 mr-2" />
            Start Launch
          </Button>
        </div>

        <Card className="card">
          <CardHeader>
            <CardTitle>Launch Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Code Review Complete", completed: true, category: "Development" },
                { title: "Unit Tests Passing", completed: true, category: "Development" },
                { title: "Security Scan Complete", completed: false, category: "Security" },
                { title: "Performance Testing", completed: false, category: "Testing" },
                { title: "Client Approval", completed: true, category: "Client" },
                { title: "Database Backup", completed: false, category: "Infrastructure" },
                { title: "Deployment to Staging", completed: true, category: "Infrastructure" },
                { title: "Release Notes Prepared", completed: false, category: "Documentation" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border-divider">
                  <Checkbox checked={item.completed} />
                  <div className="flex-1">
                    <p className={`font-medium ${item.completed ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {item.title}
                    </p>
                    <p className="text-sm text-text-secondary">{item.category}</p>
                  </div>
                  {item.completed ? (
                    <CheckCircle className="h-5 w-5 text-positive" />
                  ) : (
                    <Clock className="h-5 w-5 text-text-secondary" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card">
            <CardHeader>
              <CardTitle>Deployment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Staging Environment</span>
                  <Badge variant="default">Deployed</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Production Environment</span>
                  <Badge variant="outline">Pending</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">CDN Status</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <Button className="w-full" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Deployment Logs
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader>
              <CardTitle>Release Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-semibold text-text-primary">Version 1.2.0</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• New e-commerce checkout flow</li>
                  <li>• Improved mobile responsiveness</li>
                  <li>• Bug fixes and performance improvements</li>
                  <li>• Updated payment integration</li>
                </ul>
                <Button variant="outline" className="w-full">
                  Edit Release Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}