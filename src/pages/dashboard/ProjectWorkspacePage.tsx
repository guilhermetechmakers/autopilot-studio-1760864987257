import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, DollarSign, GitBranch, Bot } from "lucide-react";

export default function ProjectWorkspacePage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">E-commerce Platform</h1>
            <p className="text-text-secondary">TechCorp Inc. • Project Workspace</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <GitBranch className="h-4 w-4 mr-2" />
              View Repo
            </Button>
            <Button className="btn-primary">
              <Bot className="h-4 w-4 mr-2" />
              AI Copilot
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card className="card">
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-text-secondary" />
                      <span className="text-sm text-text-secondary">Timeline</span>
                    </div>
                    <p className="font-semibold text-text-primary">Feb 1 - Mar 15, 2024</p>
                    <Progress value={65} className="mt-2" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-text-secondary" />
                      <span className="text-sm text-text-secondary">Budget</span>
                    </div>
                    <p className="font-semibold text-text-primary">$25,000</p>
                    <p className="text-sm text-text-secondary">$16,250 used</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-text-secondary" />
                      <span className="text-sm text-text-secondary">Team</span>
                    </div>
                    <p className="font-semibold text-text-primary">4 members</p>
                    <p className="text-sm text-text-secondary">2 developers, 1 PM, 1 designer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card">
              <CardHeader>
                <CardTitle>Milestones & Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Project Setup", status: "completed", progress: 100 },
                    { name: "UI/UX Design", status: "completed", progress: 100 },
                    { name: "Frontend Development", status: "in-progress", progress: 75 },
                    { name: "Backend Development", status: "pending", progress: 0 },
                    { name: "Testing & QA", status: "pending", progress: 0 },
                    { name: "Launch", status: "pending", progress: 0 }
                  ].map((milestone, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        milestone.status === 'completed' ? 'bg-positive text-white' :
                        milestone.status === 'in-progress' ? 'bg-accent text-white' :
                        'bg-muted-icon text-text-secondary'
                      }`}>
                        {milestone.status === 'completed' ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-text-primary">{milestone.name}</span>
                          <span className="text-sm text-text-secondary">{milestone.progress}%</span>
                        </div>
                        <Progress value={milestone.progress} className="h-2" />
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
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Invite Team Member
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <GitBranch className="h-4 w-4 mr-2" />
                  View Repository
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bot className="h-4 w-4 mr-2" />
                  AI Assistant
                </Button>
              </CardContent>
            </Card>

            <Card className="card">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "John Doe", role: "Project Manager", avatar: "JD" },
                  { name: "Sarah Smith", role: "Frontend Developer", avatar: "SS" },
                  { name: "Mike Johnson", role: "Backend Developer", avatar: "MJ" },
                  { name: "Lisa Chen", role: "UI/UX Designer", avatar: "LC" }
                ].map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-accent">{member.avatar}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{member.name}</p>
                      <p className="text-xs text-text-secondary">{member.role}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}