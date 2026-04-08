import { Section } from "@/components";

export const metadata = {
  title: "Additional Resources",
  description: "Helpful resources and additional learning materials",
};

export default function ResourcesPage() {
  return (
    <div>
      <Section title="Additional Resources" id="resources">
        <p>
          Extra learning materials, tools, and community resources to help you
          master API development.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Troubleshooting & Support
        </h3>

        <p>
          Running into issues? Check these resources:
        </p>

        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>
            <a href="/docs/troubleshooting" className="text-blue-600 dark:text-blue-400 hover:underline">
              Troubleshooting Guide
            </a> - Solutions to common problems
          </li>
          <li>
            <a href="/docs/faqs" className="text-blue-600 dark:text-blue-400 hover:underline">
              FAQs
            </a> - Frequently asked questions
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Tools
        </h3>

        <div className="space-y-4 mt-4">
          <div className="bg-slate-50 dark:bg-slate-900/20 border-l-4 border-blue-500 p-4 rounded">
            <p className="font-semibold text-slate-900 dark:text-white">Postman</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
              Visual API client for making requests and testing APIs. Great for beginners!
            </p>
            <a href="https://www.postman.com" className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block">
              Download Postman →
            </a>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/20 border-l-4 border-purple-500 p-4 rounded">
            <p className="font-semibold text-slate-900 dark:text-white">cURL</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
              Command-line tool for making HTTP requests. Already installed on Mac/Linux.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              Use: <code className="bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">curl --help</code>
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/20 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold text-slate-900 dark:text-white">Thunder Client</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
              Fast VS Code extension for API testing. Built-in development tool.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              Install from VS Code marketplace
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/20 border-l-4 border-orange-500 p-4 rounded">
            <p className="font-semibold text-slate-900 dark:text-white">Insomnia</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
              Another visual API client, similar to Postman but simpler.
            </p>
            <a href="https://insomnia.rest" className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block">
              Download Insomnia →
            </a>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Learning Resources
        </h3>

        <div className="space-y-4 mt-4">
          <div className="bg-slate-50 dark:bg-slate-900/20 border-l-4 border-blue-500 p-4 rounded">
            <p className="font-semibold text-slate-900 dark:text-white">REST API Best Practices</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
              Learn about designing APIs following REST principles
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/20 border-l-4 border-purple-500 p-4 rounded">
            <p className="font-semibold text-slate-900 dark:text-white">HTTP Methods Explained</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
              Deep dive into GET, POST, PUT, DELETE, PATCH, and more
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/20 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold text-slate-900 dark:text-white">JSON Guide</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
              Understanding JSON format and how to work with it
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/20 border-l-4 border-orange-500 p-4 rounded">
            <p className="font-semibold text-slate-900 dark:text-white">Authentication Patterns</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
              Learn about different authentication methods: API Keys, OAuth, JWT
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Recommended Learning Path
        </h3>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <span className="font-semibold">Start here:</span> Read the Beginner section from the beginning
          </li>
          <li>
            <span className="font-semibold">Practice:</span> Use Postman or cURL to make real requests
          </li>
          <li>
            <span className="font-semibold">Build:</span> Create your first API client in your favorite language
          </li>
          <li>
            <span className="font-semibold">Intermediate:</span> Learn authentication and advanced features
          </li>
          <li>
            <span className="font-semibold">Advanced:</span> Understand optimization, security, and scaling
          </li>
          <li>
            <span className="font-semibold">Expert:</span> Design and build your own APIs
          </li>
        </ol>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Common Questions?
        </h3>

        <p>
          Check the <a href="/docs/faqs" className="text-blue-600 dark:text-blue-400 hover:underline">FAQs</a> for
          answers to frequently asked questions.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Still Need Help?
        </h3>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded mt-4">
          <p className="font-semibold text-blue-900 dark:text-blue-300">
            💡 Tip
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
            When you run into issues, try these steps:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mt-3 text-sm text-blue-800 dark:text-blue-200">
            <li>Check the error message - it often tells you what's wrong</li>
            <li>Look at the troubleshooting guide</li>
            <li>Search the FAQs</li>
            <li>Double-check your request format and parameters</li>
            <li>Make sure your token is valid and not expired</li>
          </ol>
        </div>
      </Section>
    </div>
  );
}
