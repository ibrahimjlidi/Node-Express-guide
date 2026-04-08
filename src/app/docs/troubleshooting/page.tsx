import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Troubleshooting Guide",
  description: "Solutions to common API problems",
};

export default function TroubleshootingPage() {
  return (
    <div>
      <Section title="Troubleshooting Guide" id="troubleshooting">
        <p>
          Something not working? Start here to find solutions to common problems.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          HTTP Status Code Errors
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          400 Bad Request
        </h4>

        <p className="font-semibold">Problem:</p>
        <p>Your request is invalid. The server can't process it.</p>

        <p className="font-semibold mt-4">Common causes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Missing required fields in the request body</li>
          <li>Invalid data type (string instead of number, etc.)</li>
          <li>Malformed JSON</li>
          <li>Invalid query parameter values</li>
        </ul>

        <p className="font-semibold mt-4">Solution:</p>
        <CodeBlock
          code={`# ❌ Wrong - Missing required field
POST /api/posts
{
  "title": "My Post"
  # Missing "content" field
}

# ✅ Right - Include all required fields
POST /api/posts
{
  "title": "My Post",
  "content": "This is the content"
}

# ❌ Wrong - Invalid JSON (extra comma)
{
  "title": "My Post",
  "content": "Content",
}

# ✅ Right - Valid JSON (no trailing comma)
{
  "title": "My Post",
  "content": "Content"
}`}
          language="json"
          title="Fixing 400 Errors"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          401 Unauthorized
        </h4>

        <p className="font-semibold">Problem:</p>
        <p>Authentication failed. Token is missing, invalid, or expired.</p>

        <p className="font-semibold mt-4">Common causes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>No Authorization header provided</li>
          <li>Token is expired</li>
          <li>Token is malformed or invalid</li>
          <li>Wrong token format</li>
        </ul>

        <p className="font-semibold mt-4">Solution:</p>
        <CodeBlock
          code={`# ❌ Wrong - No Authorization header
curl -X GET https://api.example.com/v1/posts

# ✅ Right - Include Authorization header
curl -X GET https://api.example.com/v1/posts \\
  -H "Authorization: Bearer YOUR_TOKEN"

# ❌ Wrong - Invalid token format
-H "Authorization: YOUR_TOKEN"

# ✅ Right - Correct format with "Bearer"
-H "Authorization: Bearer YOUR_TOKEN"

# If token is expired, refresh it:
curl -X POST https://api.example.com/v1/auth/refresh \\
  -H "Content-Type: application/json" \\
  -d '{"refreshToken":"YOUR_REFRESH_TOKEN"}'`}
          language="bash"
          title="Fixing 401 Errors"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          403 Forbidden
        </h4>

        <p className="font-semibold">Problem:</p>
        <p>You're authenticated but don't have permission for this action.</p>

        <p className="font-semibold mt-4">Common causes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Your user role doesn't allow this action</li>
          <li>You're trying to edit something you don't own</li>
          <li>The resource is private and only accessible to owner</li>
        </ul>

        <p className="font-semibold mt-4">Solution:</p>
        <p>
          You cannot bypass permission restrictions. Check that:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You're logged in as the right user</li>
          <li>Your account has the required role/permissions</li>
          <li>You own the resource you're trying to modify</li>
          <li>Ask an admin if you need higher permissions</li>
        </ul>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          404 Not Found
        </h4>

        <p className="font-semibold">Problem:</p>
        <p>The resource doesn't exist.</p>

        <p className="font-semibold mt-4">Common causes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Wrong URL or endpoint path</li>
          <li>Resource was deleted</li>
          <li>Wrong ID used</li>
          <li>Endpoint doesn't exist</li>
        </ul>

        <p className="font-semibold mt-4">Solution:</p>
        <CodeBlock
          code={`# ❌ Wrong - Typo in endpoint
curl https://api.example.com/v1/pos

# ✅ Right - Correct endpoint
curl https://api.example.com/v1/posts

# ❌ Wrong - Wrong/non-existent ID
curl https://api.example.com/v1/posts/invalid123

# ✅ Right - Valid ID
curl https://api.example.com/v1/posts/post_12345

# Check what endpoints exist:
curl https://api.example.com/v1
# This should list available endpoints`}
          language="bash"
          title="Fixing 404 Errors"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          429 Rate Limited
        </h4>

        <p className="font-semibold">Problem:</p>
        <p>You're making too many requests too quickly.</p>

        <p className="font-semibold mt-4">Solution:</p>
        <CodeBlock
          code={`# Response includes how long to wait
{
  "status": "error",
  "statusCode": 429,
  "message": "Too many requests",
  "retryAfter": 60
}

# Wait 60 seconds before making another request
# Implement exponential backoff in your client:

async function requestWithRetry(url, options, attempt = 1) {
  const response = await fetch(url, options);

  if (response.status === 429) {
    const retryAfter = response.headers.get('retry-after') || 60;
    console.log(\`Rate limited. Waiting \${retryAfter}s...\`);
    
    // Wait before retrying
    await new Promise(resolve => 
      setTimeout(resolve, retryAfter * 1000)
    );

    // Retry the request
    return requestWithRetry(url, options, attempt + 1);
  }

  return response;
}`}
          language="javascript"
          title="Handling Rate Limits"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          500 Server Error
        </h4>

        <p className="font-semibold">Problem:</p>
        <p>The server has an internal error.</p>

        <p className="font-semibold mt-4">Solution:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Wait a few seconds and try again</li>
          <li>The server might be restarting or deploying</li>
          <li>Check the status page for known issues</li>
          <li>If it persists, contact support</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Network & Connection Errors
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          ECONNREFUSED (Connection Refused)
        </h4>

        <p className="font-semibold">Problem:</p>
        <p>Can't connect to the server.</p>

        <p className="font-semibold mt-4">Common causes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Server is down or offline</li>
          <li>Wrong server address/URL</li>
          <li>Internet connection problem</li>
          <li>Firewall blocking the connection</li>
        </ul>

        <p className="font-semibold mt-4">Solution:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Check your internet connection</li>
          <li>Verify the correct URL: https://api.example.com/v1</li>
          <li>Try pinging the server: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">ping api.example.com</code></li>
          <li>Check if server is down: Visit the status page</li>
          <li>Try from a different network (phone hotspot) to test</li>
        </ul>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          ENOTFOUND (DNS Error)
        </h4>

        <p className="font-semibold">Problem:</p>
        <p>Can't resolve the domain name.</p>

        <p className="font-semibold mt-4">Solution:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Check spelling of the domain</li>
          <li>Try flushing DNS: See your OS documentation</li>
          <li>Try different DNS server (8.8.8.8)</li>
          <li>Restart your router</li>
        </ul>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Timeout
        </h4>

        <p className="font-semibold">Problem:</p>
        <p>Request takes too long to respond.</p>

        <p className="font-semibold mt-4">Solution:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Check your internet speed</li>
          <li>Server might be overloaded - try again later</li>
          <li>Increase timeout in your client (if configurable)</li>
          <li>Try a simpler request first</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Data & Response Issues
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Invalid JSON Response
        </h4>

        <p className="font-semibold">Problem:</p>
        <p>Response is not valid JSON.</p>

        <p className="font-semibold mt-4">Solution:</p>
        <CodeBlock
          code={`// Check the Content-Type header
response.headers.get('content-type')
// Should be: application/json

// Print raw response to see what you got
const text = await response.text();
console.log(text);

// If it's HTML, the API might be returning an error page
// Check if the URL ends with a slash:
// ❌ https://api.example.com/v1/posts
// ✅ https://api.example.com/v1/posts/`}
          language="javascript"
          title="Debugging Response Issues"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Empty or Unexpected Response
        </h4>

        <p className="font-semibold">Problem:</p>
        <p>You get a response but it's not what you expected.</p>

        <p className="font-semibold mt-4">Solution:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Print the entire response to see what was returned</li>
          <li>Check the response status code</li>
          <li>Verify you're looking at the right data structure</li>
          <li>Check if you need different query parameters</li>
          <li>Make sure you're sending the right HTTP method (GET vs POST, etc.)</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Debugging Checklist
        </h3>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
          <p className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            Before you give up, try:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>☐ Check the exact error message</li>
            <li>☐ Verify the URL is correct</li>
            <li>☐ Verify the HTTP method (GET, POST, etc.)</li>
            <li>☐ Check the Authorization header</li>
            <li>☐ Verify request body is valid JSON</li>
            <li>☐ Check all required fields are included</li>
            <li>☐ Print the full response (not just the error)</li>
            <li>☐ Try the request in Postman or curl first</li>
            <li>☐ Use Developer Tools Network tab to see raw request/response</li>
            <li>☐ Check the API documentation again</li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Still Stuck?
        </h3>

        <p>
          Check the <a href="/docs/faqs" className="text-blue-600 dark:text-blue-400 hover:underline">FAQs</a> for
          more answers, or review the <a href="/docs/error-handling" className="text-blue-600 dark:text-blue-400 hover:underline">Error Handling</a> section
          for more detailed information.
        </p>
      </Section>
    </div>
  );
}
