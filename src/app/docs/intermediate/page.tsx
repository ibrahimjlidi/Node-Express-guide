import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Intermediate Level - API Guide",
  description: "Intermediate API concepts and practices",
};

export default function IntermediateLevelPage() {
  return (
    <div>
      <Section title="Intermediate Level" id="intermediate-level">
        <p>
          Welcome to the intermediate level! You now understand the basics. Let's dive
          into more practical, real-world scenarios.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What You'll Learn Here
        </h3>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="font-semibold text-blue-900 dark:text-blue-300">
              📝 Getting Started
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
              Set up your development environment and make authenticated requests
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="font-semibold text-purple-900 dark:text-purple-300">
              🔐 Authentication
            </div>
            <p className="text-sm text-purple-800 dark:text-purple-200 mt-2">
              Understand tokens, login flows, and how to stay authenticated
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="font-semibold text-green-900 dark:text-green-300">
              ⚙️ CRUD Operations
            </div>
            <p className="text-sm text-green-800 dark:text-green-200 mt-2">
              Create, read, update, and delete data like a professional
            </p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="font-semibold text-orange-900 dark:text-orange-300">
              ❌ Error Handling
            </div>
            <p className="text-sm text-orange-800 dark:text-orange-200 mt-2">
              Handle errors gracefully and understand what went wrong
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <div className="font-semibold text-red-900 dark:text-red-300">
              📄 Pagination
            </div>
            <p className="text-sm text-red-800 dark:text-red-200 mt-2">
              Handle large datasets and filter results efficiently
            </p>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <div className="font-semibold text-indigo-900 dark:text-indigo-300">
              🛠️ Tools & Libraries
            </div>
            <p className="text-sm text-indigo-800 dark:text-indigo-200 mt-2">
              Use popular libraries to make your life easier
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Prerequisites
        </h3>

        <p>
          Before continuing, you should be comfortable with:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Making basic API requests with cURL</li>
          <li>Understanding HTTP methods (GET, POST, PUT, DELETE)</li>
          <li>Reading and writing JSON</li>
          <li>Basic command line usage</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Your Programming Environment
        </h3>

        <p>
          At this level, we'll use real programming languages. Choose one:
        </p>

        <div className="space-y-3 my-4">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-semibold">JavaScript/Node.js</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Great for beginners, runs in browsers. Recommended if you're new to coding.
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-orange-500">
            <p className="font-semibold">Python</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Simple syntax, perfect for automation. Recommended for scripts.
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-purple-500">
            <p className="font-semibold">Postman (GUI Tool)</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Visual interface, no coding needed. Great for testing and learning.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Next Steps
        </h3>

        <p>
          Choose a section to continue:
        </p>

        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <a href="/docs/intermediate/getting-started" className="text-blue-600 dark:text-blue-400 hover:underline">
              Getting Started
            </a> - Set up your first authenticated requests
          </li>
          <li>
            <a href="/docs/intermediate/authentication" className="text-blue-600 dark:text-blue-400 hover:underline">
              Authentication
            </a> - Understand JWT tokens and login
          </li>
          <li>
            <a href="/docs/intermediate/crud-operations" className="text-blue-600 dark:text-blue-400 hover:underline">
              CRUD Operations
            </a> - Create, read, update, delete data
          </li>
          <li>
            <a href="/docs/intermediate/error-handling" className="text-blue-600 dark:text-blue-400 hover:underline">
              Error Handling
            </a> - Handle problems gracefully
          </li>
          <li>
            <a href="/docs/intermediate/pagination" className="text-blue-600 dark:text-blue-400 hover:underline">
              Pagination & Filtering
            </a> - Work with large datasets
          </li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded mt-8">
          <p className="font-semibold text-blue-900 dark:text-blue-300">
            💡 Pro Tip
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
            Don't rush! Take time to understand each concept before moving to the next one.
            Practice with real examples.
          </p>
        </div>
      </Section>
    </div>
  );
}
