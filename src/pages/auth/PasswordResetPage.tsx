import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="card">
            <CardHeader className="text-center">
              <div className="h-16 w-16 rounded-full bg-positive/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-positive" />
              </div>
              <CardTitle>Check Your Email</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-text-secondary">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-text-secondary">
                Didn't receive the email? Check your spam folder or{" "}
                <Button variant="link" className="p-0 h-auto">
                  try again
                </Button>
              </p>
              <Button asChild className="w-full">
                <Link to="/login">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sign In
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="card">
          <CardHeader className="text-center">
            <CardTitle>Reset Password</CardTitle>
            <p className="text-text-secondary">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full btn-primary">
                Send Reset Link
              </Button>
            </form>

            <div className="text-center mt-6">
              <Link to="/login" className="text-sm text-accent hover:underline">
                <ArrowLeft className="h-4 w-4 inline mr-1" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}