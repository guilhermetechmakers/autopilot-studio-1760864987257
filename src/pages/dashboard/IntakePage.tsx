import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";

export default function IntakePage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">AI-Assisted Intake</h1>
            <p className="text-text-secondary">Book intake meetings and collect qualification data</p>
          </div>
          <Button className="btn-primary">
            <Calendar className="h-4 w-4 mr-2" />
            Book New Intake
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="card">
              <CardHeader>
                <CardTitle>Upcoming Intake Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 rounded-xl border border-border-divider">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                          <User className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-primary">Client Meeting #{item}</h3>
                          <p className="text-sm text-text-secondary">TechCorp Inc. • E-commerce Platform</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                          <Calendar className="h-4 w-4" />
                          <span>Feb 15, 2024</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                          <Clock className="h-4 w-4" />
                          <span>2:00 PM EST</span>
                        </div>
                        <Badge variant="outline" className="mt-2">Scheduled</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="card">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">This Month</span>
                  <span className="font-semibold text-text-primary">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Qualified Leads</span>
                  <span className="font-semibold text-positive">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Conversion Rate</span>
                  <span className="font-semibold text-positive">67%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Avg. Deal Size</span>
                  <span className="font-semibold text-text-primary">$25K</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card">
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-secondary mb-4">
                  Our AI assistant will help you during intake sessions by:
                </p>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• Live qualification scoring</li>
                  <li>• Suggested follow-up questions</li>
                  <li>• Budget and timeline analysis</li>
                  <li>• Tech stack recommendations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}