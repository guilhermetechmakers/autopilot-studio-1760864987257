import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for freelancers and small teams",
    features: [
      "Up to 5 active projects",
      "AI-assisted intake",
      "Basic proposal templates",
      "Client portal access",
      "Email support"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "Ideal for growing agencies",
    features: [
      "Up to 25 active projects",
      "Advanced AI copilot",
      "Custom proposal templates",
      "Advanced analytics",
      "QuickBooks integration",
      "Priority support"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large agencies and enterprises",
    features: [
      "Unlimited projects",
      "White-label options",
      "Custom integrations",
      "Dedicated support",
      "Advanced security",
      "SLA management"
    ],
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border-divider">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">AS</span>
              </div>
              <span className="text-xl font-bold text-text-primary">Autopilot Studio</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-text-secondary hover:text-text-primary transition-colors">Features</a>
              <a href="#pricing" className="text-text-secondary hover:text-text-primary transition-colors">Pricing</a>
              <a href="#testimonials" className="text-text-secondary hover:text-text-primary transition-colors">Testimonials</a>
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost">Sign In</Button>
              <Button className="btn-primary">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6">
              Simple, Transparent
              <span className="block bg-gradient-to-r from-accent to-chart-blue bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Choose the plan that fits your agency size and needs. All plans include our core features with no hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`card card-hover relative ${plan.popular ? 'ring-2 ring-accent' : ''} animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-text-primary mb-2">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                    <span className="text-text-secondary">{plan.period}</span>
                  </div>
                  <p className="text-text-secondary">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-positive flex-shrink-0" />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                    size="lg"
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                    {plan.name !== 'Enterprise' && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-primary-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Everything you need to know about our pricing and features
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans. All payments are processed securely through Stripe."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, we offer a 14-day free trial for all plans. No credit card required to get started."
              },
              {
                question: "Do you offer custom pricing?",
                answer: "Yes, we offer custom pricing for Enterprise plans with specific requirements. Contact our sales team to discuss your needs."
              }
            ].map((faq, index) => (
              <Card key={index} className="card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{faq.question}</h3>
                  <p className="text-text-secondary">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of agencies already using Autopilot Studio to scale their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}