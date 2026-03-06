'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import NavigationLogo from '@/components/common/NavigationLogo';
import MobileMenu from '@/components/common/MobileMenu';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Partidos', path: '/homepage', icon: 'HomeIcon' },
  { label: 'Admin', path: '/admin-panel', icon: 'Cog6ToothIcon' },
];

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-[1000]"
        style={{ height: '64px' }}
      >
        <div className="flex items-center justify-between h-full px-6">
          {/* Logo */}
          <NavigationLogo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  flex items-center gap-2 px-4 py-2 font-body text-sm font-medium
                  transition-all duration-200 ease-out rounded-sm border
                  ${isActive(item.path)
                    ? 'text-primary border-primary bg-surface2 shadow-glow-sm'
                    : 'text-muted-foreground border-transparent hover:text-foreground hover:border-border hover:bg-surface2'
                  }
                `}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                <Icon
                  name={item.icon as any}
                  size={16}
                  variant="outline"
                  className={isActive(item.path) ? 'text-primary' : 'text-muted-foreground'}
                />
                <span>{item.label}</span>
                {isActive(item.path) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-live-pulse" aria-hidden="true" />
                )}
              </Link>
            ))}
          </nav>

          {/* Live indicator + Mobile hamburger */}
          <div className="flex items-center gap-4">
            {/* Live status badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 border border-border rounded-sm bg-surface2">
              <span className="w-2 h-2 rounded-full bg-primary animate-live-pulse" aria-hidden="true" />
              <span className="font-mono text-xs text-primary tracking-widest uppercase">En Vivo</span>
            </div>

            {/* Hamburger button */}
            <button
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-sm border border-border bg-surface2 text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} variant="outline" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        currentPath={pathname}
      />

      {/* Spacer to offset fixed header */}
      <div style={{ height: '64px' }} aria-hidden="true" />
    </>
  );
};

export default Header;