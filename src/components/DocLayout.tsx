import React from 'react';
import Sidebar from './Sidebar';

interface NavItem {
  href: string;
  label: string;
  icon?: string;
  children?: NavItem[];
}

/**
 * DocLayout Component
 * Main layout wrapper combining navbar, sidebar, and content area
 * Features:
 * - Two-column layout on desktop
 * - Full-width on mobile
 * - Responsive design
 */
interface DocLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
}

export default function DocLayout({ children, navItems }: DocLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <Sidebar items={navItems} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white dark:bg-slate-950">
        {children}
      </main>
    </div>
  );
}
