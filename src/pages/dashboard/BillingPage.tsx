import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, TrendingUp, Clock } from "lucide-react";

export default function BillingPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Billing & Invoicing</h1>
            <p className="text-text-secondary">Milestone/time-based billing, QuickBooks sync, profit analytics</p>
          </div>
          <Button className="btn-primary">
            <CreditCard className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Monthly Revenue", value: "$45,230", change: "+12.5%", icon: DollarSign },
            { title: "Outstanding", value: "$8,500", change: "-5.2%", icon: Clock },
            { title: "Profit Margin", value: "68%", change: "+3.1%", icon: TrendingUp },
            { title: "QuickBooks Sync", value: "Active", change: "Last: 2h ago", icon: CreditCard }
          ].map((kpi, index) => (
            <Card key={index} className="card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">{kpi.title}</p>
                    <p className="text-2xl font-bold text-text-primary">{kpi.value}</p>
                    <p className="text-sm text-positive">{kpi.change}</p>
                  </div>
                  <kpi.icon className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="card">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "INV-001", client: "TechCorp Inc.", amount: "$25,000", status: "paid", date: "Feb 1, 2024" },
                { id: "INV-002", client: "StartupXYZ", amount: "$15,000", status: "pending", date: "Feb 5, 2024" },
                { id: "INV-003", client: "DataFlow Ltd.", amount: "$35,000", status: "draft", date: "Feb 8, 2024" }
              ].map((invoice, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border-divider">
                  <div>
                    <h3 className="font-semibold text-text-primary">{invoice.id}</h3>
                    <p className="text-sm text-text-secondary">{invoice.client} • {invoice.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-text-primary">{invoice.amount}</p>
                    <Badge variant={invoice.status === 'paid' ? 'default' : invoice.status === 'pending' ? 'secondary' : 'outline'}>
                      {invoice.status}
                    </Badge>
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