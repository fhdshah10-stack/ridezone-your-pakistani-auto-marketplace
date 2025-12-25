import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import logo from '@/assets/ridezone-logo.png';

const navLinks = [
  { name: 'Used Cars', path: '/' },
  { name: 'New Cars', path: '/new-cars' },
  { name: 'Bikes', path: '/bikes' },
  { name: 'Videos', path: '/videos' },
  { name: 'Blogs', path: '/blogs' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated, user, setShowAuthModal, logout } = useAuth();
  const location = useLocation();

  const handlePostAd = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      window.location.href = '/post-ad';
    }
  };

  return (
    <>
    <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src={logo} 
              alt="RideZone" 
              className="hidden md:block md:h-20 lg:h-24 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link py-2 ${
                  location.pathname === link.path ? 'nav-link-active' : ''
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setShowAuthModal(true)}
                className="hidden md:flex text-muted-foreground hover:text-foreground"
              >
                Login / Sign Up
              </Button>
            )}

            {/* Post Ad Button */}
            <Button onClick={handlePostAd} className="hidden sm:flex">
              Post an Ad
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pb-4"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search cars, bikes, keywords..."
                  className="input-field w-full pl-12"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary">
                      <User className="h-4 w-4" />
                      <span>{user?.name}</span>
                    </div>
                    <Button variant="outline" className="w-full" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowAuthModal(true);
                    }}
                  >
                    Login / Sign Up
                  </Button>
                )}
                <Button className="w-full" onClick={handlePostAd}>
                  Post an Ad
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    
    {/* Rolling UAN Strip */}
    <div className="sticky top-16 md:top-20 z-40 overflow-hidden" style={{ backgroundColor: '#E11D27' }}>
      <div className="animate-marquee whitespace-nowrap py-2">
        <span className="font-semibold mx-8" style={{ color: '#FFFFFF' }}>UAN Number: 111 222 333</span>
        <span className="font-semibold mx-8" style={{ color: '#FFFFFF' }}>UAN Number: 111 222 333</span>
        <span className="font-semibold mx-8" style={{ color: '#FFFFFF' }}>UAN Number: 111 222 333</span>
        <span className="font-semibold mx-8" style={{ color: '#FFFFFF' }}>UAN Number: 111 222 333</span>
        <span className="font-semibold mx-8" style={{ color: '#FFFFFF' }}>UAN Number: 111 222 333</span>
        <span className="font-semibold mx-8" style={{ color: '#FFFFFF' }}>UAN Number: 111 222 333</span>
      </div>
    </div>
    </>
  );
}
