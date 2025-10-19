import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter } from "lucide-react";

export default function TasksPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Tasks & Tickets</h1>
            <p className="text-text-secondary">Issue management with AI synthesis and external sync</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        <Card className="card">
          <CardHeader>
            <CardTitle>Task Board</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: "To Do", count: 8, color: "bg-text-secondary" },
                { title: "In Progress", count: 5, color: "bg-chart-orange" },
                { title: "Review", count: 3, color: "bg-accent" },
                { title: "Done", count: 12, color: "bg-positive" }
              ].map((column, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-text-primary">{column.title}</h3>
                    <Badge variant="outline">{column.count}</Badge>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((task) => (
                      <div key={task} className="p-3 rounded-lg border border-border-divider bg-card">
                        <p className="text-sm font-medium text-text-primary">Task #{task}</p>
                        <p className="text-xs text-text-secondary">E-commerce Platform</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className={`h-2 w-2 rounded-full ${column.color}`} />
                          <span className="text-xs text-text-secondary">High Priority</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}