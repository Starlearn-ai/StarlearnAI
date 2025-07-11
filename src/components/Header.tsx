// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { appLogo, appName } from '@/constants';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // Import Sheet components for mobile menu

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const handleScrollToSection = (id) => {
    // Only scroll if on the homepage
    if (location.pathname === '/') {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on homepage, navigate to homepage and then scroll
      window.location.href = `/#${id}`;
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  const navItems = (
    <>
      <a
        onClick={() => handleScrollToSection('features')}
        className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
      >
        Features
      </a>
      <a
        onClick={() => handleScrollToSection('how-it-works')}
        className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
      >
        How It Works
      </a>
      <a
        onClick={() => handleScrollToSection('pricing')}
        className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
      >
        Pricing
      </a>
      <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
        About
      </Link>
      <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
        Contact
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={appLogo} alt="Logo" className='h-8 w-8 rounded-md' />
          <span className="font-display text-xl font-bold bg-gradient-to-r from-primary to-indigo-500 text-gradient hidden sm:inline-block">
            {appName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          {navItems}
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation (Hamburger Menu & Theme Toggle) */}
        <div className="flex items-center md:hidden space-x-2"> {/* Added space-x-2 for spacing */}
          <ThemeToggle /> {/* Moved ThemeToggle here for always-on visibility */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle mobile menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:max-w-xs p-4">
              <div className="flex flex-col space-y-4 pt-6">
                {navItems}
                <hr className="my-2 border-t border-border" />
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full justify-start">Sign Up</Button>
                </Link>
                {/* ThemeToggle is now outside, so remove from here if no longer desired inside menu */}
                {/* <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-foreground">Theme</span>
                  <ThemeToggle />
                </div> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;