import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
            </div>

            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Express.js API Documentation
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Complete guide to integrating with our powerful Node.js and
              Express.js backend. Learn authentication, API endpoints, and best
              practices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/introduction"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Get Started
              </Link>
              <Link
                href="/docs/api/users"
                className="px-8 py-3 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-semibold"
              >
                View API Docs
              </Link>
            </div>
          </div>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl opacity-30" />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            What You'll Learn
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Quick Start
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Get up and running with our API in just a few minutes. Follow
                step-by-step guides with code examples.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Complete Reference
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Comprehensive documentation of all API endpoints, request and
                response formats, and error codes.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Best Practices
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Learn security, performance optimization, and error handling
                strategies from industry experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">
            Documentation Sections
          </h2>

          <div className="space-y-4">
            <Link
              href="/docs/introduction"
              className="block p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Introduction
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Overview of the API, features, and getting started with the
                basics.
              </p>
            </Link>

            <Link
              href="/docs/getting-started"
              className="block p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Getting Started
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Step-by-step guide to set up your first API call with code
                examples.
              </p>
            </Link>

            <Link
              href="/docs/project-structure"
              className="block p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Project Structure
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Understanding the backend project structure and architecture.
              </p>
            </Link>

            <Link
              href="/docs/api/users"
              className="block p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                API Documentation
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Complete reference for all available API endpoints with
                examples.
              </p>
            </Link>

            <Link
              href="/docs/authentication"
              className="block p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Authentication
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                JWT authentication, token management, and role-based access
                control.
              </p>
            </Link>

            <Link
              href="/docs/error-handling"
              className="block p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Error Handling
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Understanding error responses and how to handle them properly.
              </p>
            </Link>

            <Link
              href="/docs/best-practices"
              className="block p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Best Practices
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Security, performance optimization, and integration tips.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-blue-600 dark:bg-blue-900">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Start building with our API today. Follow the getting started guide
            and make your first API call.
          </p>
          <Link
            href="/docs/getting-started"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
          >
            Start Building
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-slate-600 dark:text-slate-400">
              © 2024 API Documentation. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Support
            </a>
            <a
              href="#"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Status
            </a>
            <a
              href="#"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Blog
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
