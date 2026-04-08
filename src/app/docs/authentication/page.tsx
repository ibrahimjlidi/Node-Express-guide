import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Authentication - API Documentation",
  description: "JWT authentication and authorization details",
};

export default function AuthenticationPage() {
  return (
    <div>
      <Section title="Authentication" id="authentication">
        <p>
          Our API uses JSON Web Tokens (JWT) for authentication. Learn how to
          authenticate, handle tokens, and work with protected endpoints.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What is JWT?
        </h3>
        <p>
          JWT (JSON Web Token) is a compact, self-contained way to transmit
          information between parties. It's digitally signed to ensure
          authenticity and can be verified on both sides without needing to
          communicate with a central server.
        </p>

        <CodeBlock
          code={`A JWT consists of three parts separated by dots:
header.payload.signature

Example:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoi...}.SflKxwRAJMsBND...`}
          language="bash"
          title="JWT Structure"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Authentication Flow
        </h3>

        <ol className="list-decimal pl-6 space-y-3 text-slate-700 dark:text-slate-300">
          <li>
            <strong>User Registration/Login</strong>: User sends credentials to
            the login endpoint
          </li>
          <li>
            <strong>Token Generation</strong>: Server validates credentials and
            generates JWT tokens
          </li>
          <li>
            <strong>Token Storage</strong>: Client stores access and refresh
            tokens
          </li>
          <li>
            <strong>Authenticated Requests</strong>: Client includes access token
            in request headers
          </li>
          <li>
            <strong>Token Verification</strong>: Server verifies token signature
            and expiration
          </li>
          <li>
            <strong>Token Refresh</strong>: When access token expires, use refresh
            token to get a new one
          </li>
        </ol>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Getting an Access Token
        </h3>

        <CodeBlock
          code={`curl -X POST https://api.example.com/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'`}
          language="bash"
          title="Login Request"
        />

        <CodeBlock
          code={`{
  "success": true,
  "status": 200,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "role": "user"
    }
  }
}`}
          language="json"
          title="Login Response"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Using the Access Token
        </h3>

        <p>
          Include the access token in the Authorization header of protected
          requests:
        </p>

        <CodeBlock
          code={`curl -X GET https://api.example.com/v1/users/profile \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`}
          language="bash"
          title="Authenticated Request"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Token Expiration & Refresh
        </h3>

        <p>
          Access tokens have a limited lifespan (typically 1 hour). When your
          access token expires, use the refresh token to get a new one.
        </p>

        <CodeBlock
          code={`curl -X POST https://api.example.com/v1/auth/refresh \\
  -H "Content-Type: application/json" \\
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'`}
          language="bash"
          title="Refresh Token Request"
        />

        <CodeBlock
          code={`{
  "success": true,
  "status": 200,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}`}
          language="json"
          title="Refresh Token Response"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Role-Based Access Control
        </h3>

        <p>The API implements three user roles with different permissions:</p>

        <div className="overflow-x-auto bg-slate-50 dark:bg-slate-900 rounded-lg p-4 my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-4 py-2 text-left font-semibold">Role</th>
                <th className="px-4 py-2 text-left font-semibold">Permissions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">
                  user
                </td>
                <td className="px-4 py-2">
                  Create, read, update own posts and comments
                </td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">
                  moderator
                </td>
                <td className="px-4 py-2">
                  User permissions + delete/edit other's comments, flag posts
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-red-600 dark:text-red-400">
                  admin
                </td>
                <td className="px-4 py-2">
                  Full access, manage users and content
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Logout
        </h3>

        <CodeBlock
          code={`curl -X POST https://api.example.com/v1/auth/logout \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`}
          language="bash"
          title="Logout Request"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Common Authentication Errors
        </h3>

        <div className="space-y-4">
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold text-red-900 dark:text-red-200">401 Unauthorized</p>
            <p className="text-red-800 dark:text-red-300 text-sm">
              Missing, invalid, or expired token
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold text-red-900 dark:text-red-200">403 Forbidden</p>
            <p className="text-red-800 dark:text-red-300 text-sm">
              User role doesn't have permission for this action
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold text-red-900 dark:text-red-200">422 Unprocessable Entity</p>
            <p className="text-red-800 dark:text-red-300 text-sm">
              Invalid email/password combination
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Best Practices
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>Always use HTTPS for authentication requests</li>
          <li>Never expose access tokens in URLs or logs</li>
          <li>Store refresh tokens securely (HTTP-only cookies recommended)</li>
          <li>Implement automatic token refresh before expiration</li>
          <li>Clear tokens on logout</li>
          <li>Use strong passwords (minimum 8 characters)</li>
          <li>Implement rate limiting on login attempts</li>
        </ul>
      </Section>
    </div>
  );
}
