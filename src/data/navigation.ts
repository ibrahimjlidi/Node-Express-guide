/**
 * Navigation structure for the documentation site
 * Defines all pages and sections organized by skill level
 */
export interface NavItem {
  href: string;
  label: string;
  icon?: string;
  children?: NavItem[];
}

export const navigationItems: NavItem[] = [
  {
    href: '/docs/introduction',
    label: 'Introduction',
  },
  
  // BEGINNER LEVEL
  {
    href: '/docs/beginner',
    label: 'Beginner Level',
    children: [
      {
        href: '/docs/beginner/what-is-api',
        label: 'What is an API?',
      },
      {
        href: '/docs/beginner/first-request',
        label: 'Your First Request',
      },
      {
        href: '/docs/beginner/basic-concepts',
        label: 'Basic Concepts',
      },
      {
        href: '/docs/beginner/simple-examples',
        label: 'Simple Examples',
      },
    ],
  },

  // INTERMEDIATE LEVEL
  {
    href: '/docs/intermediate',
    label: 'Intermediate Level',
    children: [
      {
        href: '/docs/intermediate/getting-started',
        label: 'Getting Started',
      },
      {
        href: '/docs/intermediate/authentication',
        label: 'Authentication',
      },
      {
        href: '/docs/intermediate/crud-operations',
        label: 'CRUD Operations',
      },
      {
        href: '/docs/intermediate/error-handling',
        label: 'Error Handling',
      },
      {
        href: '/docs/intermediate/pagination-filtering',
        label: 'Pagination & Filtering',
      },
    ],
  },

  // ADVANCED LEVEL
  {
    href: '/docs/advanced',
    label: 'Advanced Level',
    children: [
      {
        href: '/docs/advanced/architecture',
        label: 'Backend Architecture',
      },
      {
        href: '/docs/advanced/advanced-auth',
        label: 'Advanced Authentication',
      },
      {
        href: '/docs/advanced/performance',
        label: 'Performance Optimization',
      },
      {
        href: '/docs/advanced/security',
        label: 'Security & Best Practices',
      },
      {
        href: '/docs/advanced/scaling',
        label: 'Scaling & Deployment',
      },
    ],
  },

  // API REFERENCE (All Levels)
  {
    href: '/docs/api',
    label: 'API Reference',
    children: [
      {
        href: '/docs/api/users',
        label: 'Users Endpoints',
      },
      {
        href: '/docs/api/posts',
        label: 'Posts Endpoints',
      },
      {
        href: '/docs/api/comments',
        label: 'Comments Endpoints',
      },
    ],
  },

  // OLD PAGES (Still Available)
  {
    href: '/docs/resources',
    label: 'Additional Resources',
    children: [
      {
        href: '/docs/troubleshooting',
        label: 'Troubleshooting',
      },
      {
        href: '/docs/faqs',
        label: 'FAQs',
      },
    ],
  },
];
