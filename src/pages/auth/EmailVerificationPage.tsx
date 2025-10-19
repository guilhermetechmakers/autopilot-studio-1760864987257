import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, ArrowRight } from "lucide-react";

export default function EmailVerificationPage() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="min-h-screen bg-primary-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="card">
          <CardHeader className="text-center">
            <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              {isVerified ? (
                <CheckCircle className="h-8 w-8 text-positive" />
              ) : (
                <Mail className="h-8 w-8 text-accent" />
              )}
            </div>
            <CardTitle>
              {isVerified ? "Email Verified!" : "Verify Your Email"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {isVerified ? (
              <>
                <p className="text-text-secondary">
                  Your email has been successfully verified. You can now access all features of Autopilot Studio.
                </p>
                <Button asChild className="w-full btn-primary">
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <p className="text-text-secondary">
                  We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
                </p>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsVerified(true)}
                  >
                    I've verified my email
                  </Button>
                  <Button variant="ghost" className="w-full">
                    Resend verification email
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}