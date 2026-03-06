'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  currentPath: string;
}

const MobileMenu = ({ isOpen, onClose, navItems, currentPath }: MobileMenuProps) => {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isActive = (path: string) => currentPath === path;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background z-[1050] md:hidden"
        style={{ top: '64px', opacity: 0.95 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className="fixed left-0 right-0 bg-surface border-b border-border z-[1100] md:hidden animate-slide-down"
        style={{ top: '64px' }}
      >
        {/* Live status bar */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-border bg-surface2">
          <span className="w-2 h-2 rounded-full bg-primary animate-live-pulse" aria-hidden="true" />
          <span className="font-mono text-xs text-primary tracking-widest uppercase">Sistema Activo</span>
          <span className="ml-auto font-mono text-xs text-muted-foreground">
            {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Nav Items */}
        <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Navegación móvil">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-4 py-4 rounded-sm border
                font-body text-base font-medium transition-all duration-200
                min-h-[56px]
                ${isActive(item.path)
                  ? 'text-primary border-primary bg-surface2 shadow-glow-sm border-l-2'
                  : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-surface2 hover:border-border'
                }
              `}
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              <Icon
                name={item.icon as any}
                size={20}
                variant="outline"
                className={isActive(item.path) ? 'text-primary' : 'text-muted-foreground'}
              />
              <span>{item.label}</span>
              {isActive(item.path) && (
                <span className="ml-auto flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-live-pulse" aria-hidden="true" />
                  <span className="font-mono text-xs text-primary">ACTIVO</span>
                </span>
              )}
              {!isActive(item.path) && (
                <Icon
                  name="ChevronRightIcon"
                  size={16}
                  variant="outline"
                  className="ml-auto text-muted-foreground"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Footer info */}
        <div className="px-6 py-4 border-t border-border bg-surface2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">FOOTBALL_TERMINAL</span>
            <span className="font-mono text-xs text-muted-foreground">v1.0.0</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;