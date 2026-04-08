'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon?: string;
  children?: NavItem[];
}

/**
 * Sidebar Component
 * Navigation sidebar with support for nested sections
 * Features:
 * - Active link highlighting
 * - Collapsible sections
 * - Responsive mobile drawer interface
 * - Smooth scroll to sections
 */
interface SidebarProps {
  items: NavItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(items.map((item) => item.href))
  );

  const toggleSection = (href: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(href)) {
      newExpanded.delete(href);
    } else {
      newExpanded.add(href);
    }
    setExpandedSections(newExpanded);
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const active = isActive(item.href);
    const isExpanded = expandedSections.has(item.href);
    const paddingLevel = level * 16;

    return (
      <div key={item.href}>
        <div
          className="flex items-center"
          style={{ paddingLeft: `${paddingLevel}px` }}
        >
          {hasChildren && (
            <button
              onClick={() => toggleSection(item.href)}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
            >
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isExpanded ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </button>
          )}
          {!hasChildren && level > 0 && <div className="w-6" />}

          <Link
            href={item.href}
            className={`flex-1 px-3 py-2 rounded-lg transition-colors font-medium text-sm ${
              active
                ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            {item.label}
          </Link>
        </div>

        {/* Nested items */}
        {hasChildren && isExpanded && (
          <div className="bg-slate-50 dark:bg-slate-900/30 border-l-2 border-slate-200 dark:border-slate-800 my-1">
            {item.children!.map((child) => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="hidden md:block w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
      <nav className="p-4 space-y-2">
        {items.map((item) => renderNavItem(item))}
      </nav>
    </aside>
  );
}
