import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  Users, 
  Clock, 
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const kpiCards = [
  {
    title: "Monthly Revenue",
    value: "$45,230",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-positive"
  },
  {
    title: "Active Projects",
    value: "12",
    change: "+2",
    trend: "up",
    icon: FileText,
    color: "text-accent"
  },
  {
    title: "Client Satisfaction",
    value: "98%",
    change: "+3%",
    trend: "up",
    icon: Users,
    color: "text-positive"
  },
  {
    title: "Avg. Delivery Time",
    value: "14 days",
    change: "-2 days",
    trend: "up",
    icon: Clock,
    color: "text-positive"
  }
];

const recentProjects = [
  {
    id: 1,
    name: "E-commerce Platform",
    client: "TechCorp Inc.",
    status: "In Progress",
    progress: 75,
    budget: "$25,000",
    deadline: "2024-02-15",
    priority: "high"
  },
  {
    id: 2,
    name: "Mobile App Redesign",
    client: "StartupXYZ",
    status: "Review",
    progress: 90,
    budget: "$15,000",
    deadline: "2024-02-10",
    priority: "medium"
  },
  {
    id: 3,
    name: "AI Integration",
    client: "DataFlow Ltd.",
    status: "Planning",
    progress: 25,
    budget: "$35,000",
    deadline: "2024-03-01",
    priority: "low"
  }
];

const recentActivities = [
  {
    id: 1,
    type: "project",
    message: "Project 'E-commerce Platform' milestone completed",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-positive"
  },
  {
    id: 2,
    type: "client",
    message: "New client 'DataFlow Ltd.' signed contract",
    time: "4 hours ago",
    icon: Users,
    color: "text-accent"
  },
  {
    id: 3,
    type: "billing",
    message: "Invoice #INV-2024-001 paid by TechCorp Inc.",
    time: "6 hours ago",
    icon: DollarSign,
    color: "text-positive"
  },
  {
    id: 4,
    type: "alert",
    message: "Project deadline approaching for 'Mobile App Redesign'",
    time: "1 day ago",
    icon: AlertCircle,
    color: "text-negative"
  }
];

const upcomingTasks = [
  {
    id: 1,
    title: "Review client feedback for E-commerce Platform",
    project: "E-commerce Platform",
    dueDate: "Today",
    priority: "high"
  },
  {
    id: 2,
    title: "Prepare proposal for new AI project",
    project: "Sales",
    dueDate: "Tomorrow",
    priority: "medium"
  },
  {
    id: 3,
    title: "Update project documentation",
    project: "Mobile App Redesign",
    dueDate: "Feb 8",
    priority: "low"
  }
];

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
            <p className="text-text-secondary">Welcome back! Here's what's happening with your projects.</p>
          </div>
          <Button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((kpi, index) => (
            <Card key={index} className="card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">{kpi.title}</p>
                    <p className="text-2xl font-bold text-text-primary">{kpi.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {kpi.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-positive" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-negative" />
                      )}
                      <span className={`text-sm font-medium ${kpi.color}`}>{kpi.change}</span>
                    </div>
                  </div>
                  <div className={`h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center`}>
                    <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <Card className="card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Projects
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 rounded-xl border border-border-divider hover:bg-hover-overlay transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-text-primary">{project.name}</h3>
                        <Badge 
                          variant={project.priority === 'high' ? 'destructive' : project.priority === 'medium' ? 'default' : 'secondary'}
                        >
                          {project.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">{project.client}</p>
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span>Budget: {project.budget}</span>
                        <span>Due: {project.deadline}</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-text-secondary">Progress</span>
                          <span className="text-text-primary font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <Card className="card">
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-hover-overlay transition-colors">
                    <div className={`h-2 w-2 rounded-full mt-2 ${
                      task.priority === 'high' ? 'bg-negative' : 
                      task.priority === 'medium' ? 'bg-chart-orange' : 
                      'bg-text-secondary'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{task.title}</p>
                      <p className="text-xs text-text-secondary">{task.project} • {task.dueDate}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-full bg-hover-overlay flex items-center justify-center`}>
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">{activity.message}</p>
                      <p className="text-xs text-text-secondary">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Book Intake</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="h-6 w-6" />
                <span>Create Proposal</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Plus className="h-6 w-6" />
                <span>New Project</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <DollarSign className="h-6 w-6" />
                <span>Send Invoice</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}