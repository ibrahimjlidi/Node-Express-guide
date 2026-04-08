import React from 'react';

/**
 * Section Component
 * Reusable section wrapper for documentation content
 * Features:
 * - Consistent spacing and padding
 * - Optional heading
 * - Responsive on mobile and desktop
 */
interface SectionProps {
  children: React.ReactNode;
  title?: string;
  id?: string;
}

export default function Section({ children, title, id }: SectionProps) {
  return (
    <section
      id={id}
      className="px-6 md:px-12 py-12 max-w-4xl mx-auto scroll-mt-20"
    >
      {title && (
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          {title}
        </h2>
      )}
      <div className="prose dark:prose-invert max-w-none">
        {children}
      </div>
    </section>
  );
}
