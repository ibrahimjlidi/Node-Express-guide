import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Best Practices - API Documentation",
  description: "Best practices for API integration and usage",
};

export default function BestPracticesPage() {
  return (
    <div>
      <Section title="Best Practices" id="best-practices">
        <p>
          Follow these best practices to build robust and efficient
          integrations with our API.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Security
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          1. Always Use HTTPS
        </h4>
        <p>
          Always use HTTPS for API calls, especially when sending sensitive data
          like authentication tokens or user credentials.
        </p>

        <CodeBlock
          code={`# ❌ Don't do this
curl http://api.example.com/v1/users

# ✅ Always use HTTPS
curl https://api.example.com/v1/users`}
          language="bash"
          title="HTTPS Usage"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          2. Secure Token Storage
        </h4>
        <p>
          Never store access tokens in local storage. Use HTTP-only cookies or
          secure storage mechanisms.
        </p>

        <CodeBlock
          code={`// ❌ Don't do this
localStorage.setItem('token', accessToken);

// ✅ Better approach - use HTTP-only cookies
// Server sets: Set-Cookie: accessToken=...; HttpOnly; Secure; SameSite=Strict

// Or in your client, use a more secure method
// Consider using a library like axios with interceptors`}
          language="javascript"
          title="Token Storage"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          3. Validate Input
        </h4>
        <p>
          Validate all user input on the client side before sending to the API.
        </p>

        <CodeBlock
          code={`function validateEmail(email) {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

function createPost(data) {
  // Validate required fields
  if (!data.title || data.title.trim().length < 5) {
    throw new Error('Title must be at least 5 characters');
  }

  if (!data.content || data.content.trim().length < 10) {
    throw new Error('Content must be at least 10 characters');
  }

  // Send to API only if validation passes
  return fetch('/v1/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}`}
          language="javascript"
          title="Input Validation"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Performance
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          1. Use Pagination
        </h4>
        <p>
          Always use pagination for list endpoints to reduce load and improve
          response times.
        </p>

        <CodeBlock
          code={`# ❌ Avoid fetching all items at once
curl https://api.example.com/v1/posts

# ✅ Use pagination
curl https://api.example.com/v1/posts?page=1&limit=20`}
          language="bash"
          title="Pagination"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          2. Implement Caching
        </h4>
        <p>
          Cache frequently requested data to reduce API calls and improve
          application performance.
        </p>

        <CodeBlock
          code={`const cache = new Map();

async function getCachedUser(userId) {
  const cacheKey = \`user-\${userId}\`;
  
  // Check cache first
  if (cache.has(cacheKey)) {
    console.log('Cache hit');
    return cache.get(cacheKey);
  }

  // Fetch from API if not cached
  const response = await fetch(\`/v1/users/\${userId}\`);
  const user = await response.json();

  // Store in cache with 5-minute expiration
  cache.set(cacheKey, user);
  setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000);

  return user;
}`}
          language="javascript"
          title="Client-Side Caching"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          3. Use Request Timeouts
        </h4>
        <p>
          Always set timeouts on API requests to prevent hanging connections.
        </p>

        <CodeBlock
          code={`// Using fetch with AbortController
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

try {
  const response = await fetch('/v1/posts', {
    signal: controller.signal
  });
  const data = await response.json();
  return data;
} catch (error) {
  if (error.name === 'AbortError') {
    console.error('Request timeout');
  }
} finally {
  clearTimeout(timeoutId);
}`}
          language="javascript"
          title="Request Timeouts"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Error Handling
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          1. Implement Retry Logic
        </h4>
        <p>
          Implement exponential backoff for retrying failed requests, especially
          for transient errors (5xx, 429).
        </p>

        <CodeBlock
          code={`async function retryRequest(fn, maxRetries = 3, delayMs = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      // Exponential backoff
      const delay = delayMs * Math.pow(2, i);
      console.log(\`Retry in \${delay}ms...\`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Usage
retryRequest(() => fetch('/v1/posts').then(r => r.json()));`}
          language="javascript"
          title="Retry Logic with Exponential Backoff"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          2. Handle Rate Limiting
        </h4>
        <p>
          Respect rate limits by monitoring headers and implementing backoff
          strategies.
        </p>

        <CodeBlock
          code={`async function handleRateLimit(response) {
  const remaining = response.headers.get('x-ratelimit-remaining');
  const reset = response.headers.get('x-ratelimit-reset');

  if (remaining === '0') {
    const waitTime = (reset - Date.now() / 1000) * 1000;
    console.log(\`Rate limited. Waiting \${waitTime}ms before retry\`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
}

// Check rate limit after each request
fetch('/v1/posts').then(response => {
  handleRateLimit(response);
  return response.json();
});`}
          language="javascript"
          title="Rate Limit Handling"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          API Usage
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          1. Use Specific Endpoints
        </h4>
        <p>
          When possible, use specific endpoints rather than fetching all data.
        </p>

        <CodeBlock
          code={`// ❌ Avoid fetching all users then filtering
const allUsers = await fetch('/v1/users').then(r => r.json());
const userById = allUsers.data.find(u => u.id === targetId);

// ✅ Use specific endpoint
const user = await fetch(\`/v1/users/\${targetId}\`).then(r => r.json());`}
          language="javascript"
          title="Specific Endpoints"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          2. Batch Operations
        </h4>
        <p>
          When appropriate, use batch operations instead of multiple single
          requests.
        </p>

        <CodeBlock
          code={`// ❌ Multiple requests
for (const postId of postIds) {
  await fetch(\`/v1/posts/\${postId}\`, { method: 'DELETE' });
}

// ✅ Batch operation (if available)
await fetch('/v1/posts/batch', {
  method: 'POST',
  body: JSON.stringify({ action: 'delete', ids: postIds })
});`}
          language="javascript"
          title="Batch Operations"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Monitoring & Logging
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          1. Log API Calls for Debugging
        </h4>

        <CodeBlock
          code={`async function loggedFetch(endpoint, options = {}) {
  const startTime = performance.now();
  
  console.log(\`[API] \${options.method || 'GET'} \${endpoint}\`);

  try {
    const response = await fetch(endpoint, options);
    const duration = performance.now() - startTime;
    
    console.log(\`[API] \${response.status} \${endpoint} (\${duration.toFixed(0)}ms)\`);
    
    return response;
  } catch (error) {
    console.error(\`[API Error] \${endpoint}\`, error);
    throw error;
  }
}`}
          language="javascript"
          title="API Call Logging"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Quick Checklist
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>✅ Use HTTPS for all API calls</li>
          <li>✅ Store tokens securely</li>
          <li>✅ Validate input on client side</li>
          <li>✅ Implement pagination for list endpoints</li>
          <li>✅ Cache when appropriate</li>
          <li>✅ Set request timeouts</li>
          <li>✅ Implement retry logic with backoff</li>
          <li>✅ Handle rate limiting gracefully</li>
          <li>✅ Monitor error rates and latencies</li>
          <li>✅ Keep your API credentials secure</li>
          <li>✅ Use specific endpoints when possible</li>
          <li>✅ Implement proper error handling</li>
        </ul>
      </Section>
    </div>
  );
}
