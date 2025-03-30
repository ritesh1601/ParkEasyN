import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Car,
  LogIn,
  LogOut,
  Menu,
  ParkingCircle,
  Search,
  User,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  isLoggedIn?: boolean;
  userType?: "driver" | "owner";
  userName?: string;
  userAvatar?: string;
  onLogin?: () => void;
  onLogout?: () => void;
  onToggleUserType?: () => void;
  onSearch?: (query: string) => void;
}

const Header = ({
  isLoggedIn = false,
  userType = "driver",
  userName = "Guest User",
  userAvatar = "",
  onLogin = () => {},
  onLogout = () => {},
  onToggleUserType = () => {},
  onSearch = () => {},
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="w-full h-[70px] bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <ParkingCircle className="h-8 w-8 text-primary mr-2" />
          <span className="text-xl font-bold">ParkEasy</span>
        </div>

        {/* Search - Hidden on mobile */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex relative max-w-md w-full mx-4"
        >
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for parking locations..."
            className="pl-9 pr-4 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {/* User Type Toggle */}
          {isLoggedIn && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleUserType}
              className="flex items-center gap-2"
            >
              {userType === "driver" ? (
                <>
                  <Car className="h-4 w-4" />
                  <span>Driver</span>
                </>
              ) : (
                <>
                  <ParkingCircle className="h-4 w-4" />
                  <span>Owner</span>
                </>
              )}
            </Button>
          )}

          {/* Auth Buttons or User Menu */}
          {!isLoggedIn ? (
            <Button onClick={onLogin} className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-8 w-8 rounded-full">
                  <Avatar>
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {userType === "driver" ? "Driver" : "Parking Owner"}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Car className="mr-2 h-4 w-4" />
                  <span>My Bookings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <ParkingCircle className="h-6 w-6 text-primary mr-2" />
                <span>ParkEasy</span>
              </SheetTitle>
            </SheetHeader>
            <div className="py-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for parking..."
                  className="pl-9 pr-4 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>

              {/* User Type Toggle (if logged in) */}
              {isLoggedIn && (
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-2">
                    You are a:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={userType === "driver" ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        onToggleUserType();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Car className="h-4 w-4" />
                      <span>Driver</span>
                    </Button>
                    <Button
                      variant={userType === "owner" ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        onToggleUserType();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2"
                    >
                      <ParkingCircle className="h-4 w-4" />
                      <span>Owner</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="space-y-1 pt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find Parking
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  How It Works
                </Button>
                {isLoggedIn && (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Bookings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Button>
                  </>
                )}
              </div>

              {/* Auth Buttons */}
              <div className="pt-4 border-t">
                {!isLoggedIn ? (
                  <Button
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => {
                      onLogin();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
