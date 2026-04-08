import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Error Handling - API Documentation",
  description: "Understanding API errors and error responses",
};

export default function ErrorHandlingPage() {
  return (
    <div>
      <Section title="Error Handling" id="error-handling">
        <p>
          Learn how the API handles errors and how to interpret error responses
          to debug your integration.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Error Response Format
        </h3>

        <p>
          All error responses follow a consistent format with a status code,
          error message, and additional details.
        </p>

        <CodeBlock
          code={`{
  "success": false,
  "status": 400,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}
          language="json"
          title="Error Response Example"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          HTTP Status Codes
        </h3>

        <div className="overflow-x-auto bg-slate-50 dark:bg-slate-900 rounded-lg p-4 my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-4 py-2 text-left font-semibold">Code</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-mono text-green-600 dark:text-green-400">
                  200
                </td>
                <td className="px-4 py-2">OK</td>
                <td className="px-4 py-2">Request succeeded</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-mono text-green-600 dark:text-green-400">
                  201
                </td>
                <td className="px-4 py-2">Created</td>
                <td className="px-4 py-2">Resource created successfully</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-mono text-red-600 dark:text-red-400">
                  400
                </td>
                <td className="px-4 py-2">Bad Request</td>
                <td className="px-4 py-2">Invalid request parameters or format</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-mono text-red-600 dark:text-red-400">
                  401
                </td>
                <td className="px-4 py-2">Unauthorized</td>
                <td className="px-4 py-2">Missing or invalid authentication</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-mono text-red-600 dark:text-red-400">
                  403
                </td>
                <td className="px-4 py-2">Forbidden</td>
                <td className="px-4 py-2">
                  Insufficient permissions for this resource
                </td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-mono text-red-600 dark:text-red-400">
                  404
                </td>
                <td className="px-4 py-2">Not Found</td>
                <td className="px-4 py-2">Resource does not exist</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-mono text-red-600 dark:text-red-400">
                  422
                </td>
                <td className="px-4 py-2">Unprocessable Entity</td>
                <td className="px-4 py-2">Validation error in request data</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-mono text-red-600 dark:text-red-400">
                  429
                </td>
                <td className="px-4 py-2">Too Many Requests</td>
                <td className="px-4 py-2">Rate limit exceeded</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-mono text-red-600 dark:text-red-400">
                  500
                </td>
                <td className="px-4 py-2">Internal Server Error</td>
                <td className="px-4 py-2">Server error (contact support)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-red-600 dark:text-red-400">
                  503
                </td>
                <td className="px-4 py-2">Service Unavailable</td>
                <td className="px-4 py-2">Server temporarily unavailable</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Error Codes
        </h3>

        <div className="space-y-4">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="font-semibold text-slate-900 dark:text-white">
              VALIDATION_ERROR
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Request validation failed. Check the details for specific field errors.
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="font-semibold text-slate-900 dark:text-white">
              AUTHENTICATION_ERROR
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Authentication failed. Invalid credentials or expired token.
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="font-semibold text-slate-900 dark:text-white">
              AUTHORIZATION_ERROR
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              You don't have permission to access this resource.
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="font-semibold text-slate-900 dark:text-white">
              RESOURCE_NOT_FOUND
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              The requested resource does not exist.
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="font-semibold text-slate-900 dark:text-white">
              DUPLICATE_RESOURCE
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              A resource with this data already exists (e.g., duplicate email).
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="font-semibold text-slate-900 dark:text-white">
              RATE_LIMIT_EXCEEDED
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Too many requests. Please wait before trying again.
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="font-semibold text-slate-900 dark:text-white">
              SERVER_ERROR
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              An unexpected server error occurred. Try again later.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Common Error Examples
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Missing Required Field
        </h4>

        <CodeBlock
          code={`{
  "success": false,
  "status": 400,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "title",
        "message": "Title is required"
      }
    ]
  }
}`}
          language="json"
          title="Example: Missing Required Field"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Unauthorized Access
        </h4>

        <CodeBlock
          code={`{
  "success": false,
  "status": 401,
  "error": {
    "code": "AUTHENTICATION_ERROR",
    "message": "Invalid or expired token"
  }
}`}
          language="json"
          title="Example: Unauthorized"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Insufficient Permissions
        </h4>

        <CodeBlock
          code={`{
  "success": false,
  "status": 403,
  "error": {
    "code": "AUTHORIZATION_ERROR",
    "message": "Only admins can perform this action"
  }
}`}
          language="json"
          title="Example: Forbidden"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Resource Not Found
        </h4>

        <CodeBlock
          code={`{
  "success": false,
  "status": 404,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "User with ID 'invalid-id' not found"
  }
}`}
          language="json"
          title="Example: Not Found"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Handling Errors in Your Client
        </h3>

        <CodeBlock
          code={`async function makeApiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, options);
    const data = await response.json();

    if (!response.ok) {
      // Handle error response
      console.error('API Error:', data.error);
      
      if (response.status === 401) {
        // Handle authentication error - refresh token or redirect to login
        refreshAuthToken();
      } else if (response.status === 429) {
        // Handle rate limiting - implement exponential backoff
        console.log('Rate limited. Retry after:', response.headers['retry-after']);
      }
      
      throw new Error(data.error.message);
    }

    return data;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}

// Usage
makeApiRequest('/v1/posts', { method: 'GET' })
  .then(data => console.log(data))
  .catch(error => console.error(error));`}
          language="javascript"
          title="Error Handling in JavaScript"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Rate Limiting
        </h3>

        <p>
          The API implements rate limiting to prevent abuse. Check your
          remaining requests in the response headers:
        </p>

        <CodeBlock
          code={`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642254000`}
          language="bash"
          title="Rate Limit Headers"
        />

        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <strong>X-RateLimit-Limit</strong>: Maximum requests per hour
          </li>
          <li>
            <strong>X-RateLimit-Remaining</strong>: Remaining requests in current window
          </li>
          <li>
            <strong>X-RateLimit-Reset</strong>: Unix timestamp when limit resets
          </li>
        </ul>
      </Section>
    </div>
  );
}
