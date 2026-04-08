import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Getting Started - API Documentation",
  description: "Get started with the API in minutes",
};

export default function GettingStartedPage() {
  return (
    <div>
      <Section title="Getting Started" id="getting-started">
        <p>
          This guide will help you set up and make your first API request in
          just a few minutes.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Prerequisites
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>An active account on our platform</li>
          <li>API credentials (API key and secret)</li>
          <li>A tool for making HTTP requests (cURL, Postman, or similar)</li>
          <li>Basic understanding of REST APIs and JSON</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Step 1: Obtain API Credentials
        </h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Log in to your account on our platform</li>
          <li>Navigate to Settings → API Keys</li>
          <li>Click "Generate New API Key"</li>
          <li>
            Copy your API key and store it securely (you won't see it again!)
          </li>
        </ol>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Step 2: Create a User Account via API
        </h3>
        <p>
          First, let's create a user account by making a POST request to the
          user creation endpoint.
        </p>

        <CodeBlock
          code={`curl -X POST https://api.example.com/v1/users/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "confirmPassword": "securePassword123"
  }'`}
          language="bash"
          title="Create User Account"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Step 3: Authenticate and Get Token
        </h3>
        <p>
          After creating an account, authenticate to receive a JWT token for
          subsequent requests.
        </p>

        <CodeBlock
          code={`curl -X POST https://api.example.com/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'`}
          language="bash"
          title="Authentication Request"
        />

        <p>
          The response will contain an access token that you'll use for
          authenticated requests:
        </p>

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
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  },
  "message": "Login successful"
}`}
          language="json"
          title="Authentication Response"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Step 4: Make an Authenticated Request
        </h3>
        <p>
          Use the access token to make authenticated requests by including it
          in the Authorization header.
        </p>

        <CodeBlock
          code={`curl -X GET https://api.example.com/v1/users/profile \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`}
          language="bash"
          title="Authenticated Request"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          JavaScript/Node.js Example
        </h3>

        <CodeBlock
          code={`const fetch = require('node-fetch');

async function authenticateAndFetchProfile() {
  try {
    // Step 1: Login
    const loginResponse = await fetch('https://api.example.com/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'john@example.com',
        password: 'securePassword123'
      })
    });

    const loginData = await loginResponse.json();
    const token = loginData.data.accessToken;

    // Step 2: Fetch user profile with token
    const profileResponse = await fetch('https://api.example.com/v1/users/profile', {
      method: 'GET',
      headers: {
        'Authorization': \`Bearer \${token}\`
      }
    });

    const profileData = await profileResponse.json();
    console.log('User Profile:', profileData.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

authenticateAndFetchProfile();`}
          language="javascript"
          title="Node.js Example"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Common Errors
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>401 Unauthorized</strong>: Invalid or missing token
          </li>
          <li>
            <strong>400 Bad Request</strong>: Invalid request parameters
          </li>
          <li>
            <strong>404 Not Found</strong>: Resource does not exist
          </li>
          <li>
            <strong>429 Too Many Requests</strong>: Rate limit exceeded
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Next Steps
        </h3>
        <p>
          Now that you've made your first API call, explore our{" "}
          <a href="/docs/api" className="text-blue-600 dark:text-blue-400 hover:underline">
            comprehensive API documentation
          </a>{" "}
          to learn about all available endpoints and features.
        </p>
      </Section>
    </div>
  );
}
