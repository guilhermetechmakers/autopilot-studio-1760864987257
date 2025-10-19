import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Download, Eye, Settings } from "lucide-react";

export default function HandoverPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Handover Pack</h1>
            <p className="text-text-secondary">One-click creation of final deliverables and SLA setup</p>
          </div>
          <Button className="btn-primary">
            <Package className="h-4 w-4 mr-2" />
            Create Handover Pack
          </Button>
        </div>

        <Card className="card">
          <CardHeader>
            <CardTitle>Handover Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Project Documentation", selected: true, type: "documentation" },
                { name: "Source Code Repository", selected: true, type: "code" },
                { name: "Deployment Guide", selected: true, type: "guide" },
                { name: "API Documentation", selected: false, type: "documentation" },
                { name: "User Manual", selected: true, type: "manual" },
                { name: "Video Walkthrough", selected: false, type: "video" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border-divider">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-text-secondary" />
                    <div>
                      <p className="font-medium text-text-primary">{item.name}</p>
                      <p className="text-sm text-text-secondary capitalize">{item.type}</p>
                    </div>
                  </div>
                  <Badge variant={item.selected ? 'default' : 'outline'}>
                    {item.selected ? 'Selected' : 'Not Selected'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-hover-overlay">
                  <h4 className="font-semibold text-text-primary">E-commerce Platform Handover Pack</h4>
                  <p className="text-sm text-text-secondary">Created: Feb 10, 2024</p>
                  <p className="text-sm text-text-secondary">Size: 45.2 MB</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader>
              <CardTitle>SLA Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Response Time</span>
                  <Badge variant="outline">24 hours</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Resolution Time</span>
                  <Badge variant="outline">72 hours</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Support Level</span>
                  <Badge variant="outline">Standard</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure SLA
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}