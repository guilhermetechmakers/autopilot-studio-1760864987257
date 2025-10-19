import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, HelpCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-primary-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="card">
          <CardHeader className="text-center">
            <div className="h-16 w-16 rounded-full bg-negative/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-bold text-negative">404</span>
            </div>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
            <p className="text-text-secondary">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            <div className="text-center">
              <Button variant="ghost" className="text-accent hover:text-accent/80">
                <HelpCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}