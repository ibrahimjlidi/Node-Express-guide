import { Section } from "@/components";

export const metadata = {
  title: "API Reference",
  description: "Complete API endpoint reference documentation",
};

export default function APIReferencePage() {
  return (
    <div>
      <Section title="API Reference" id="api-reference">
        <p>
          Complete reference documentation for all API endpoints. Choose an endpoint
          group below to see detailed information about each endpoint.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Base URL
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm">
          https://api.example.com/v1
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Endpoint Groups
        </h3>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <a href="/docs/api/users" className="block bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-lg transition">
            <div className="font-semibold text-blue-900 dark:text-blue-300 text-lg">
              👤 Users Endpoints
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
              Register, login, get profiles, manage user data
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-400 mt-3">
              Authentication, profile management, follow/unfollow
            </p>
          </a>

          <a href="/docs/api/posts" className="block bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800 hover:shadow-lg transition">
            <div className="font-semibold text-green-900 dark:text-green-300 text-lg">
              📝 Posts Endpoints
            </div>
            <p className="text-sm text-green-800 dark:text-green-200 mt-2">
              Create, read, update, delete posts
            </p>
            <p className="text-xs text-green-700 dark:text-green-400 mt-3">
              CRUD operations, search, trending, feed
            </p>
          </a>

          <a href="/docs/api/comments" className="block bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800 hover:shadow-lg transition">
            <div className="font-semibold text-purple-900 dark:text-purple-300 text-lg">
              💬 Comments Endpoints
            </div>
            <p className="text-sm text-purple-800 dark:text-purple-200 mt-2">
              Manage comments on posts and replies
            </p>
            <p className="text-xs text-purple-700 dark:text-purple-400 mt-3">
              Create, edit, delete, like comments
            </p>
          </a>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Authentication
        </h3>

        <p>
          All endpoints (except /auth/register and /auth/login) require authentication.
          Include your JWT token in the Authorization header:
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm mt-3">
          Authorization: Bearer YOUR_ACCESS_TOKEN
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Response Format
        </h3>

        <p>
          All responses follow a consistent format:
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg mt-3">
          <pre className="text-sm text-slate-700 dark:text-slate-300 overflow-auto">
{`{
  "status": "success" | "error",
  "data": { ... },
  "message": "Human readable message",
  "timestamp": "2024-01-15T10:30:00Z"
}`}
          </pre>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Status Codes
        </h3>

        <div className="space-y-2">
          <div className="flex items-start">
            <div className="bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 px-3 py-1 rounded font-mono text-sm mr-3 mt-1 whitespace-nowrap">
              200
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">OK</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Request succeeded, data is in response</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 px-3 py-1 rounded font-mono text-sm mr-3 mt-1 whitespace-nowrap">
              201
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Created</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Resource created successfully</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 px-3 py-1 rounded font-mono text-sm mr-3 mt-1 whitespace-nowrap">
              400
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Bad Request</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Invalid request data (missing required fields, wrong format)</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 px-3 py-1 rounded font-mono text-sm mr-3 mt-1 whitespace-nowrap">
              401
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Unauthorized</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Missing or invalid authentication token</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 px-3 py-1 rounded font-mono text-sm mr-3 mt-1 whitespace-nowrap">
              403
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Forbidden</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Authenticated but don't have permission</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 px-3 py-1 rounded font-mono text-sm mr-3 mt-1 whitespace-nowrap">
              404
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Not Found</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Resource doesn't exist</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 px-3 py-1 rounded font-mono text-sm mr-3 mt-1 whitespace-nowrap">
              429
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Rate Limited</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Too many requests, wait before trying again</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 px-3 py-1 rounded font-mono text-sm mr-3 mt-1 whitespace-nowrap">
              500
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Server Error</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Internal server error, try again later</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Rate Limiting
        </h3>

        <p>
          API requests are rate limited to prevent abuse:
        </p>

        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li><strong>Authenticated requests:</strong> 1000 requests per hour</li>
          <li><strong>Unauthenticated requests:</strong> 100 requests per hour</li>
          <li>Rate limit headers are included in every response</li>
          <li>Exceed limit → 429 Too Many Requests response</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Pagination
        </h3>

        <p>
          Endpoints that return lists support pagination via query parameters:
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm mt-3">
{`GET /posts?page=2&limit=20

page: 1-based page number (default: 1)
limit: items per page, max 100 (default: 20)`}
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Filtering & Sorting
        </h3>

        <p>
          Most list endpoints support filtering and sorting:
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm mt-3">
{`GET /posts?category=technology&sort=createdAt&order=desc

category: Filter by category
sort: Field to sort by (createdAt, likes, etc)
order: "asc" or "desc" (default: asc)`}
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Ready to Begin?
        </h3>

        <p>
          Choose an endpoint group to explore in detail:
        </p>

        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li><a href="/docs/api/users" className="text-blue-600 dark:text-blue-400 hover:underline">Users Endpoints</a></li>
          <li><a href="/docs/api/posts" className="text-blue-600 dark:text-blue-400 hover:underline">Posts Endpoints</a></li>
          <li><a href="/docs/api/comments" className="text-blue-600 dark:text-blue-400 hover:underline">Comments Endpoints</a></li>
        </ul>
      </Section>
    </div>
  );
}
