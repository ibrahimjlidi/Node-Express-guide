import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Error Handling - Intermediate Guide",
  description: "Handle errors gracefully and debug API issues",
};

export default function ErrorHandlingPage() {
  return (
    <div>
      <Section title="Error Handling (Intermediate)" id="error-handling">
        <p>
          APIs fail. Networks drop. Servers crash. Good developers prepare for all of it.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Understanding Error Responses
        </h3>

        <CodeBlock
          code={`{
  "status": "error",
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format",
      "code": "INVALID_EMAIL"
    },
    {
      "field": "password",
      "message": "Password too short",
      "code": "PASSWORD_TOO_SHORT"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}`}
          language="json"
          title="Typical Error Response"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Common HTTP Status Codes
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>200-299</strong> - Success</li>
          <li><strong>300-399</strong> - Redirect (rarely in APIs)</li>
          <li><strong>400</strong> - Bad request (you sent wrong data)</li>
          <li><strong>401</strong> - Unauthorized (no/invalid token)</li>
          <li><strong>403</strong> - Forbidden (no permission)</li>
          <li><strong>404</strong> - Not found (resource doesn't exist)</li>
          <li><strong>429</strong> - Too many requests (rate limited)</li>
          <li><strong>500-599</strong> - Server error</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Error Handling Patterns
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Try-Catch Pattern
        </h4>

        <CodeBlock
          code={`async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    // Check HTTP status
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    // Network errors go here
    console.error('Network error:', error.message);
    throw error;
  }
}

// Usage
try {
  const user = await fetchUserData('user123');
  console.log(user);
} catch (error) {
  console.error('Failed to fetch user:', error);
}`}
          language="javascript"
          title="Basic Try-Catch"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Status Code Handling
        </h4>

        <CodeBlock
          code={`async function apiCall(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (response.ok) {
    return data;
  }

  // Handle different error codes
  switch (response.status) {
    case 400:
      console.error('Validation error:', data.errors);
      throw new Error('Invalid request data');

    case 401:
      console.error('Not authenticated');
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Please login again');

    case 403:
      console.error('Insufficient permissions');
      throw new Error('You do not have permission');

    case 404:
      console.error('Resource not found');
      throw new Error('The resource was not found');

    case 429:
      console.error('Rate limited');
      throw new Error('Too many requests. Please try again later');

    case 500:
      console.error('Server error');
      throw new Error('Server error. Please try again later');

    default:
      throw new Error(\`Unknown error: \${response.status}\`);
  }
}

// Usage
try {
  const user = await apiCall('/api/users/123');
} catch (error) {
  console.error(error.message);
}`}
          language="javascript"
          title="Status Code Specific Handling"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Retry Logic
        </h3>

        <p>
          Some errors are temporary. Retrying can help.
        </p>

        <CodeBlock
          code={`async function apiCallWithRetry(
  url,
  options = {},
  maxRetries = 3,
  delayMs = 1000
) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const data = await response.json();

        // Don't retry client errors (400, 401, etc)
        if (response.status < 500) {
          throw new Error(data.message || 'Request failed');
        }

        // Retry server errors (500, 502, etc)
        throw new Error('Server error - will retry');
      }

      return response.json();

    } catch (error) {
      lastError = error;
      console.log(\`Attempt \${attempt} failed: \${error.message}\`);

      // Wait before retrying
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
        delayMs *= 2; // Exponential backoff
      }
    }
  }

  throw new Error(\`Failed after \${maxRetries} attempts: \${lastError.message}\`);
}

// Usage
try {
  const user = await apiCallWithRetry('/api/users/123');
} catch (error) {
  console.error('Final error:', error);
}`}
          language="javascript"
          title="Retry with Exponential Backoff"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Validation Errors
        </h3>

        <CodeBlock
          code={`async function registerUser(email, password) {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle validation errors
      if (data.errors && Array.isArray(data.errors)) {
        const errorMap = {};
        data.errors.forEach(error => {
          errorMap[error.field] = error.message;
        });
        console.error('Validation errors:', errorMap);
        return { success: false, errors: errorMap };
      }

      throw new Error(data.message);
    }

    return { success: true, user: data.data };

  } catch (error) {
    console.error('Registration failed:', error);
    return { success: false, error: error.message };
  }
}

// Usage
const result = await registerUser('user@example.com', '123');
if (!result.success) {
  console.log('Errors:', result.errors);
  // Display to user:
  // Email: Invalid email format
  // Password: Password too short
}`}
          language="javascript"
          title="Handling Validation Errors"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Rate Limiting
        </h3>

        <CodeBlock
          code={`class RateLimiter {
  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  canMakeRequest() {
    const now = Date.now();
    
    // Remove old requests outside the window
    this.requests = this.requests.filter(
      time => now - time < this.windowMs
    );

    // Check if we can make another request
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }

    return false;
  }

  getRetryAfter() {
    if (this.requests.length === 0) return 0;
    
    const oldestRequest = this.requests[0];
    const retryAfter = this.windowMs - (Date.now() - oldestRequest);
    return Math.ceil(retryAfter / 1000);
  }
}

const limiter = new RateLimiter(10, 60000); // 10 requests per minute

async function apiCall(url) {
  if (!limiter.canMakeRequest()) {
    const retryAfter = limiter.getRetryAfter();
    console.error(\`Rate limited. Retry after \${retryAfter} seconds\`);
    throw new Error('Rate limited');
  }

  const response = await fetch(url);
  return response.json();
}`}
          language="javascript"
          title="Client-Side Rate Limiter"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Debugging Tips
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Log request and response</strong> - Save what you sent and what you got back</li>
          <li><strong>Check headers</strong> - Especially Authorization header</li>
          <li><strong>Validate input</strong> - Before sending to API, validate your data</li>
          <li><strong>Use browser DevTools</strong> - Network tab shows request details</li>
          <li><strong>Test endpoints</strong> - Use curl or Postman to test APIs independently</li>
          <li><strong>Read error messages</strong> - APIs provide helpful error descriptions</li>
          <li><strong>Check timestamps</strong> - Time differences can cause auth/cache issues</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Error Logging Class Example
        </h3>

        <CodeBlock
          code={`class APILogger {
  static log(request, response, error = null) {
    const timestamp = new Date().toISOString();
    
    const logEntry = {
      timestamp,
      url: request.url,
      method: request.method,
      status: response?.status,
      error: error?.message,
      headers: request.headers,
      responseTime: response?.time,
      body: request.method !== 'GET' ? request.body : undefined
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group(\`[\${timestamp}] \${request.method} \${request.url}\`);
      console.log('Request:', request);
      console.log('Response:', response);
      if (error) console.error('Error:', error);
      console.groupEnd();
    }

    // Send to logging service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToService(logEntry);
    }

    return logEntry;
  }

  static sendToService(logEntry) {
    fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logEntry)
    });
  }
}`}
          language="javascript"
          title="Logging Errors"
        />
      </Section>
    </div>
  );
}
