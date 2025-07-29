import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, HelpCircle, User } from "lucide-react";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Admin");

  const navigationTabs = [
    { name: "Home", href: "/" },
    { name: "Admin", href: "/admin" },
    { name: "Analytics", href: "/analytics" },
    { name: "Maps", href: "/maps" },
    { name: "Assessments", href: "/assessments" },
    { name: "Items", href: "/items" }
  ];

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-foreground rounded-full"></div>
            </div>
            <span className="text-lg font-semibold text-foreground sr-only">Education Portal</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {navigationTabs.map((tab) => (
              <Button
                key={tab.name}
                variant={activeTab === tab.name ? "default" : "ghost"}
                className="h-10 px-4"
                onClick={() => setActiveTab(tab.name)}
                aria-current={activeTab === tab.name ? "page" : undefined}
              >
                {tab.name}
                {(tab.name === "Admin" || tab.name === "Analytics") && (
                  <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
                )}
              </Button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10"
              aria-label="Help and support"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="h-10 px-3"
                  aria-label="User menu"
                >
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Michael</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;