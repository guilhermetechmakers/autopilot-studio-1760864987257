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
  Sparkles,
  Play,
  Users,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Globe,
  ChevronRight,
  Quote,
  Award,
  Target,
  Rocket,
  BarChart3,
  Settings,
  Headphones,
  BookOpen,
  HelpCircle,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "AI-Assisted Intake",
    description: "Automated lead qualification and proposal generation with AI-powered insights and smart scheduling.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: FileText,
    title: "Smart Proposals",
    description: "Generate professional proposals and contracts with automated pricing, terms, and e-signature integration.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: FolderOpen,
    title: "Project Spin-up",
    description: "One-click project creation with repos, milestones, client portals, and automated workflow setup.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Bot,
    title: "AI Copilot",
    description: "Intelligent assistant for specs, meeting minutes, project management, and automated task generation.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: CreditCard,
    title: "Billing & Analytics",
    description: "Automated invoicing, time tracking, profit analytics, and QuickBooks integration for seamless finance management.",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Package,
    title: "Handover Packs",
    description: "One-click delivery packages with documentation, Loom tutorials, SLA automation, and renewal options.",
    gradient: "from-teal-500 to-blue-500"
  }
];

const howItWorks = [
  {
    step: "1",
    title: "Book Intake",
    description: "AI-assisted qualification and meeting booking with smart calendar integration",
    icon: Calendar,
    color: "bg-blue-500"
  },
  {
    step: "2", 
    title: "Auto-Proposal",
    description: "Generate and send professional proposals with automated pricing and contract terms",
    icon: FileText,
    color: "bg-purple-500"
  },
  {
    step: "3",
    title: "Project Spin-up", 
    description: "One-click project creation with repos, milestones, and client portal setup",
    icon: FolderOpen,
    color: "bg-green-500"
  },
  {
    step: "4",
    title: "Launch & Handover",
    description: "Deploy and deliver with automated handover packs and SLA management",
    icon: Rocket,
    color: "bg-orange-500"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechFlow Agency",
    company: "TechFlow Agency",
    content: "Autopilot Studio transformed our agency operations. We've increased project delivery speed by 40% and improved client satisfaction significantly. The AI copilot is a game-changer.",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Freelance Developer",
    company: "Independent",
    content: "The AI copilot handles proposal generation and project setup so I can focus on what I do best - coding. The automated billing has saved me hours every week.",
    rating: 5,
    avatar: "MC"
  },
  {
    name: "Emily Rodriguez",
    role: "Project Manager",
    company: "Digital Solutions",
    content: "The automated billing and analytics features have revolutionized our workflow. The profit insights help us make better business decisions and scale efficiently.",
    rating: 5,
    avatar: "ER"
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
      "Email support",
      "Basic analytics"
    ],
    popular: false,
    cta: "Start Free Trial"
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
      "Priority support",
      "Team collaboration"
    ],
    popular: true,
    cta: "Get Started"
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
      "SLA management",
      "Custom workflows"
    ],
    popular: false,
    cta: "Contact Sales"
  }
];

const stats = [
  { number: "500+", label: "Agencies Trust Us" },
  { number: "40%", label: "Faster Delivery" },
  { number: "95%", label: "Client Satisfaction" },
  { number: "24/7", label: "AI Support" }
];

const customerLogos = [
  "TechFlow", "Digital Solutions", "CodeCraft", "WebWise", "AppStudio", "CloudTech"
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
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
              <a href="#how-it-works" className="text-text-secondary hover:text-text-primary transition-colors">How It Works</a>
              <a href="#pricing" className="text-text-secondary hover:text-text-primary transition-colors">Pricing</a>
              <a href="#testimonials" className="text-text-secondary hover:text-text-primary transition-colors">Testimonials</a>
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-text-secondary hover:text-text-primary">Sign In</Button>
              <Button className="btn-primary">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-chart-orange/5 animate-gradient-xy"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-chart-orange/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-5xl mx-auto">
            <Badge variant="secondary" className="mb-6 animate-fade-in bg-accent/10 text-accent border-accent/20">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Business Automation
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 animate-fade-in-up leading-tight">
              Automate Your Agency
              <span className="block hero-text-gradient animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                From Lead to Launch
              </span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.4s' }}>
              The complete business OS for AI developers and agencies. Automate intake, proposals, project spin-up, 
              AI copilot, billing, and handover - all in one platform that scales with your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Button size="lg" className="btn-primary text-lg px-8 py-4 group">
                Book Free Intake
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.number}</div>
                  <div className="text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Logos */}
      <section className="py-12 bg-primary-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-text-secondary">Trusted by leading agencies worldwide</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {customerLogos.map((logo, index) => (
              <div key={index} className="text-2xl font-bold text-text-secondary hover:text-accent transition-colors">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-primary-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Everything You Need to Scale
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              From initial client contact to project handover, automate your entire agency workflow 
              with our comprehensive suite of AI-powered tools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary">{feature.title}</h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              How It Works
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Get from lead to launch in 4 simple steps with our automated workflow
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center animate-fade-in-up group" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className={`step-number ${item.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {item.step}
                </div>
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-accent/10 to-chart-orange/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.description}</p>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-accent to-chart-orange transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-primary-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Trusted by Agencies Worldwide
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              See what our customers are saying about Autopilot Studio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="testimonial-card animate-fade-in-up group hover:shadow-xl transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-accent/20 mb-4" />
                  <p className="text-text-secondary mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{testimonial.name}</p>
                      <p className="text-sm text-text-secondary">{testimonial.role}</p>
                      <p className="text-xs text-accent">{testimonial.company}</p>
                    </div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Choose the plan that fits your agency size and needs. All plans include our core features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`pricing-card relative ${plan.popular ? 'pricing-card-popular' : ''} animate-fade-in-up group`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-accent text-white px-4 py-1 text-sm font-medium">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-5xl font-bold text-text-primary">{plan.price}</span>
                      <span className="text-text-secondary ml-1">{plan.period}</span>
                    </div>
                    <p className="text-text-secondary">{plan.description}</p>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-positive flex-shrink-0" />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'} group`}
                    size="lg"
                  >
                    {plan.cta}
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 cta-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Automate Your Agency?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of agencies already using Autopilot Studio to scale their operations 
            and deliver exceptional results to their clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-accent hover:bg-white/90">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AS</span>
                </div>
                <span className="text-xl font-bold">Autopilot Studio</span>
              </div>
              <p className="text-white/70 mb-6 max-w-md leading-relaxed">
                The complete business OS for AI developers and agencies. Automate your entire workflow 
                from lead intake to project handover.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-lg">Product</h3>
              <ul className="space-y-3 text-white/70">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-lg">Support</h3>
              <ul className="space-y-3 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">&copy; 2024 Autopilot Studio. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}