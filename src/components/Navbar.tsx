
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, User } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-primary text-white py-4 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <span className="text-secondary">Assess</span>Vault Pro
        </Link>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:bg-primary/80"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-secondary">Home</Link>
          <Link to="/companies" className="hover:text-secondary">Companies</Link>
          <Link to="/pricing" className="hover:text-secondary">Pricing</Link>
          <Link to="/about" className="hover:text-secondary">About</Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="hover:text-secondary">
                <Link to="/dashboard">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="secondary" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Button variant="secondary" asChild>
              <Link to="/auth">
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </Link>
            </Button>
          )}
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-primary p-4 z-50 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="hover:text-secondary py-2 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/companies" 
                className="hover:text-secondary py-2 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Companies
              </Link>
              <Link 
                to="/pricing" 
                className="hover:text-secondary py-2 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/about" 
                className="hover:text-secondary py-2 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="hover:text-secondary py-2 px-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button variant="secondary" onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button variant="secondary" asChild onClick={() => setIsMenuOpen(false)}>
                  <Link to="/auth">
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
