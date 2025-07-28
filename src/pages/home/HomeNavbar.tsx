import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Badge } from "../../components/ui/badge";
import { Menu, X, User, Settings, LogOut, BarChart3 } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

const HomeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole] = useState("Admin"); // This would come from auth context
  const user = useSelector((state: RootState) => state.user.user);
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  console.log(user);
  console.log(auth);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground p-2 rounded-lg">
              <BarChart3 className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-foreground">
              RetailDock
            </span>
          </div>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#solutions"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Solutions
            </a>
            <a
              href="#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div> */}

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!auth?.isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate("/auth/login")}
                >
                  Log In
                </Button>
                <Button onClick={() => navigate("/auth/register")}>
                  Sign Up
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {userRole.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-80 p-4"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <Badge variant="secondary" className="text-xs">
                          {user?.role}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Button
                    variant="ghost"
                    className="w-full mt-2 justify-start"
                    onClick={() => navigate("/home")}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Home{" "}
                  </Button>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#features"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#solutions"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                Solutions
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                Pricing
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                Contact
              </a>
              {!auth?.isAuthenticated ? (
                <div className="pt-4 pb-3 border-t border-border space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Log In
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Sign Up
                  </Button>
                </div>
              ) : (
                <div className="pt-4 pb-3 border-t border-border">
                  <div className="flex items-center px-3 py-2">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full mt-2 justify-start"
                    onClick={() => navigate("/home")}
                  >
                    Home{" "}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full mt-2 justify-start"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HomeNavbar;
