import { type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  FolderOpen, 
  Users, 
  CheckSquare, 
  Video, 
  Rocket, 
  CreditCard, 
  Package, 
  Bell, 
  Settings, 
  User,
  HelpCircle,
  LogOut,
  Menu
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Intake",
    href: "/dashboard/intake",
    icon: Calendar,
  },
  {
    name: "Proposals",
    href: "/dashboard/proposals",
    icon: FileText,
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: FolderOpen,
  },
  {
    name: "Client Portal",
    href: "/dashboard/client-portal",
    icon: Users,
  },
  {
    name: "Tasks & Tickets",
    href: "/dashboard/tasks",
    icon: CheckSquare,
  },
  {
    name: "Meetings & Notes",
    href: "/dashboard/meetings",
    icon: Video,
  },
  {
    name: "Launch & Deploy",
    href: "/dashboard/launch",
    icon: Rocket,
  },
  {
    name: "Billing & Invoicing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    name: "Handover Pack",
    href: "/dashboard/handover",
    icon: Package,
  },
  {
    name: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
];

const secondaryItems = [
  {
    name: "Admin",
    href: "/dashboard/admin",
    icon: Settings,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Help & Docs",
    href: "/help",
    icon: HelpCircle,
  },
];

export function Sidebar({ onOpenChange, className }: SidebarProps) {
  const location = useLocation();

  return (
    <div className={cn(
      "flex h-full w-72 flex-col bg-sidebar-bg border-r border-border-divider",
      className
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-border-divider">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">AS</span>
          </div>
          <span className="text-lg font-semibold text-text-primary">Autopilot Studio</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onOpenChange(false)}
          className="lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 space-y-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/dashboard" && location.pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "nav-item group",
                  isActive && "nav-item-active"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>

        <Separator className="my-4 mx-4" />

        <div className="px-4 space-y-1">
          {secondaryItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "nav-item group",
                  isActive && "nav-item-active"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border-divider p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-text-secondary hover:text-text-primary"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}