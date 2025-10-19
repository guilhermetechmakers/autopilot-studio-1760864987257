import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Plus, Calendar, Bot } from "lucide-react";

export default function MeetingsPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Meetings & Notes</h1>
            <p className="text-text-secondary">Schedule meetings, record, and convert to AI minutes and tickets</p>
          </div>
          <Button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="card">
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Project Kickoff", client: "TechCorp Inc.", time: "Today, 2:00 PM", status: "scheduled" },
                    { title: "Design Review", client: "StartupXYZ", time: "Tomorrow, 10:00 AM", status: "scheduled" },
                    { title: "Client Check-in", client: "DataFlow Ltd.", time: "Feb 12, 3:00 PM", status: "scheduled" }
                  ].map((meeting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border-divider">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                          <Video className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-primary">{meeting.title}</h3>
                          <p className="text-sm text-text-secondary">{meeting.client}</p>
                          <div className="flex items-center gap-2 text-sm text-text-secondary">
                            <Calendar className="h-4 w-4" />
                            <span>{meeting.time}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">{meeting.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="card">
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-hover-overlay">
                    <Bot className="h-5 w-5 text-accent" />
                    <span className="text-sm text-text-primary">Auto-transcribe meetings</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-hover-overlay">
                    <Bot className="h-5 w-5 text-accent" />
                    <span className="text-sm text-text-primary">Generate action items</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-hover-overlay">
                    <Bot className="h-5 w-5 text-accent" />
                    <span className="text-sm text-text-primary">Create tickets automatically</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card">
              <CardHeader>
                <CardTitle>Meeting Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">This Week</span>
                  <span className="font-semibold text-text-primary">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Total Hours</span>
                  <span className="font-semibold text-text-primary">12.5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Action Items</span>
                  <span className="font-semibold text-positive">23</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}