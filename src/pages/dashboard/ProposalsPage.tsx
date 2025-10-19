import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Eye, Edit, Send } from "lucide-react";

export default function ProposalsPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Proposals & SoW Generator</h1>
            <p className="text-text-secondary">Generate, edit, and send professional proposals</p>
          </div>
          <Button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Proposal
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="card">
              <CardHeader>
                <CardTitle>Recent Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "E-commerce Platform", client: "TechCorp Inc.", status: "Sent", amount: "$25,000" },
                    { name: "Mobile App Redesign", client: "StartupXYZ", status: "Draft", amount: "$15,000" },
                    { name: "AI Integration", client: "DataFlow Ltd.", status: "Approved", amount: "$35,000" }
                  ].map((proposal, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border-divider">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-primary">{proposal.name}</h3>
                          <p className="text-sm text-text-secondary">{proposal.client} • {proposal.amount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={proposal.status === 'Approved' ? 'default' : proposal.status === 'Sent' ? 'secondary' : 'outline'}>
                          {proposal.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
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
                <CardTitle>Proposal Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">This Month</span>
                  <span className="font-semibold text-text-primary">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Approved</span>
                  <span className="font-semibold text-positive">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Pending</span>
                  <span className="font-semibold text-chart-orange">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Total Value</span>
                  <span className="font-semibold text-positive">$180K</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}