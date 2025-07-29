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
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
            </div>
            <span className="text-lg font-semibold text-foreground sr-only">Education Portal</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2" role="navigation" aria-label="Main navigation">
            {navigationTabs.map((tab) => (
              <Button
                key={tab.name}
                variant={activeTab === tab.name ? "default" : "ghost"}
                className={`h-10 px-4 font-medium ${
                  activeTab === tab.name 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-muted"
                }`}
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
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 text-muted-foreground hover:text-foreground"
              aria-label="Help and support"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="h-10 px-3 text-foreground hover:bg-muted"
                  aria-label="User menu"
                >
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline font-medium">Michael</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
                <DropdownMenuItem className="hover:bg-accent">Profile</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent">Settings</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent">Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;