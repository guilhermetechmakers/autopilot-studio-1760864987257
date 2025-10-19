import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Calendar,
  FileText,
  FolderOpen,
  CreditCard,
  Package,
  Bot,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "AI-Assisted Intake",
    description: "Automated lead qualification and proposal generation with AI-powered insights."
  },
  {
    icon: FileText,
    title: "Smart Proposals",
    description: "Generate professional proposals and contracts with automated pricing and terms."
  },
  {
    icon: FolderOpen,
    title: "Project Spin-up",
    description: "One-click project creation with repos, milestones, and client portals."
  },
  {
    icon: Bot,
    title: "AI Copilot",
    description: "Intelligent assistant for specs, meeting minutes, and project management."
  },
  {
    icon: CreditCard,
    title: "Billing & Analytics",
    description: "Automated invoicing, time tracking, and profit analytics with QuickBooks sync."
  },
  {
    icon: Package,
    title: "Handover Packs",
    description: "One-click delivery packages with documentation and SLA automation."
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechFlow Agency",
    content: "Autopilot Studio transformed our agency operations. We've increased project delivery speed by 40% and improved client satisfaction significantly.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Freelance Developer",
    content: "The AI copilot is a game-changer. It handles proposal generation and project setup so I can focus on what I do best - coding.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Project Manager, Digital Solutions",
    content: "The automated billing and analytics features have saved us hours every week. The profit insights help us make better business decisions.",
    rating: 5
  }
];

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

export default function LandingPage() {
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
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Business Automation
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 animate-fade-in-up">
              Automate Your Agency
              <span className="block bg-gradient-to-r from-accent to-chart-blue bg-clip-text text-transparent">
                From Lead to Launch
              </span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              The complete business OS for AI developers and agencies. Automate intake, proposals, project spin-up, 
              AI copilot, billing, and handover - all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="btn-primary text-lg px-8 py-4">
                Book Free Intake
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-primary-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Everything You Need to Scale
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              From initial client contact to project handover, automate your entire agency workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card card-hover animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary">{feature.title}</h3>
                  </div>
                  <p className="text-text-secondary">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              How It Works
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Get from lead to launch in 4 simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Book Intake", description: "AI-assisted qualification and meeting booking" },
              { step: "2", title: "Auto-Proposal", description: "Generate and send professional proposals" },
              { step: "3", title: "Project Spin-up", description: "One-click project creation with all tools" },
              { step: "4", title: "Launch & Handover", description: "Deploy and deliver with automated handover" }
            ].map((item, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="h-16 w-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-primary-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Trusted by Agencies Worldwide
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              See what our customers are saying about Autopilot Studio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-text-secondary mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-text-primary">{testimonial.name}</p>
                    <p className="text-sm text-text-secondary">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Choose the plan that fits your agency size and needs
            </p>
          </div>
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
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                      <span className="text-text-secondary">{plan.period}</span>
                    </div>
                    <p className="text-text-secondary">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
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
                  </Button>
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
            Ready to Automate Your Agency?
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

      {/* Footer */}
      <footer className="bg-text-primary text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AS</span>
                </div>
                <span className="text-xl font-bold">Autopilot Studio</span>
              </div>
              <p className="text-white/70">
                The complete business OS for AI developers and agencies.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
            <p>&copy; 2024 Autopilot Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}