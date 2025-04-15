import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Filing Checklist', path: '/filing-checklist' },
    { name: 'Form Checklist', path: '/form-checklist' },
    { name: 'Investment & Budget', path: '/investment-budget' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-taxBlue rounded-md p-1">
              <span className="text-white font-bold text-xl">TS</span>
            </div>
            <span className="text-lg font-bold text-gray-800">TaxSathi</span>
          </Link>

          {/* Mobile menu button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          )}

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Auth buttons */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-taxBlue text-white">
                        {user.user_metadata?.full_name ?
                          user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() :
                          user.email?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden pt-2 pb-3 border-t border-gray-200 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Auth buttons for mobile */}
            {user ? (
              <div className="px-3 py-2 flex justify-between items-center border-t border-gray-200 mt-2 pt-2">
                <div>
                  <p className="font-medium">{user.user_metadata?.full_name || 'User'}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={signOut} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="block px-3 py-2 mt-2 text-gray-700 hover:bg-gray-100 rounded-md border-t border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Sign In</span>
                </div>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
