import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Sidebar */}
      <Sidebar 
        open={sidebarOpen} 
        onOpenChange={setSidebarOpen}
        className="hidden lg:block"
      />
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <Sidebar 
        open={sidebarOpen} 
        onOpenChange={setSidebarOpen}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      />
      
      {/* Main Content */}
      <div className="lg:pl-72">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}