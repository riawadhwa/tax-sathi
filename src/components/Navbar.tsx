
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              >
                {item.name}
              </Link>
            ))}
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
