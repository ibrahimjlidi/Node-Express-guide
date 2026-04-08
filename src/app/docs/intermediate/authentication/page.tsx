import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Authentication - Intermediate Guide",
  description: "Understanding JWT tokens and token rotation",
};

export default function IntermediateAuthenticationPage() {
  return (
    <div>
      <Section title="Authentication (Intermediate)" id="authentication">
        <p>
          Now that you know the basics, let's understand how tokens work and how
          to handle them professionally.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Understanding JWT Tokens
        </h3>

        <p>
          A JWT (JSON Web Token) is like a digital ID card. It contains information
          about who you are and is signed by the server so it can't be forged.
        </p>

        <CodeBlock
          code={`// JWT Structure: Header.Payload.Signature
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOiJ1c2VyMTIzIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNjA2Mjk0ODE1LCJleHAiOjE2MDYyOTg0MTV9.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

// Decoded Header (metadata)
{
  "alg": "HS256",  // Algorithm used
  "typ": "JWT"     // Token type
}

// Decoded Payload (your data)
{
  "userId": "user123",
  "email": "user@example.com",
  "role": "user",
  "iat": 1606294815,  // Issued at (when created)
  "exp": 1606298415   // Expiration time (when it expires)
}

// Signature: Created by server, verifies token hasn't been tampered with`}
          language="json"
          title="JWT Structure"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Token Lifecycle
        </h3>

        <CodeBlock
          code={`// 1. USER REGISTERS AND LOGS IN
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// 2. SERVER CREATES AND RETURNS TOKEN
HTTP 200 OK
{
  "accessToken": "eyJhbGc...",  // Short-lived (15 minutes)
  "refreshToken": "eyJhbGc...", // Long-lived (7 days)
  "expiresIn": 900               // Expires in 900 seconds
}

// 3. CLIENT STORES TOKENS
localStorage.setItem('accessToken', 'eyJhbGc...');
localStorage.setItem('refreshToken', 'eyJhbGc...');

// 4. CLIENT USES TOKEN FOR REQUESTS
GET /api/posts
Authorization: Bearer eyJhbGc...

// 5. TOKEN EXPIRES (after 15 minutes)
GET /api/posts
Authorization: Bearer eyJhbGc...
// Returns: 401 Unauthorized - Token expired

// 6. CLIENT REFRESHES TOKEN
POST /api/auth/refresh
{
  "refreshToken": "eyJhbGc..."
}

// SERVER RETURNS NEW TOKEN
{
  "accessToken": "eyJhbGc...",  // Fresh token!
  "refreshToken": "eyJhbGc..."  // May rotate refresh token too
}

// 7. CLIENT CONTINUES WITH NEW TOKEN
GET /api/posts
Authorization: Bearer eyJhbGc...  // New token
// Returns: 200 OK`}
          language="bash"
          title="Token Lifecycle"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Login Flow
        </h3>

        <CodeBlock
          code={`async function login(email, password) {
  try {
    // Step 1: Send credentials
    const response = await fetch('https://api.example.com/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    // Step 2: Check response
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    // Step 3: Extract tokens
    const { accessToken, refreshToken, expiresIn } = await response.json();

    // Step 4: Store tokens
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    // Step 5: Set expiry timer
    // Refresh token before it actually expires (e.g., 1 min before)
    setTimeout(() => {
      refreshAccessToken();
    }, (expiresIn - 60) * 1000);

    return { success: true, accessToken };

  } catch (error) {
    console.error('Login failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Call it
await login('user@example.com', 'password123');`}
          language="javascript"
          title="Login Implementation"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Making Authenticated Requests
        </h3>

        <CodeBlock
          code={`// Helper function to get token
function getAccessToken() {
  return localStorage.getItem('accessToken');
}

// Helper function to add auth header
function getAuthHeaders() {
  const token = getAccessToken();
  return {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  };
}

// Example 1: Create a post
async function createPost(title, content) {
  const response = await fetch('https://api.example.com/v1/posts', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, content })
  });
  return response.json();
}

// Example 2: Get user's profile
async function getProfile() {
  const response = await fetch('https://api.example.com/v1/user/profile', {
    method: 'GET',
    headers: getAuthHeaders()
  });
  return response.json();
}

// Example 3: Update post
async function updatePost(postId, data) {
  const response = await fetch(
    \`https://api.example.com/v1/posts/\${postId}\`,
    {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    }
  );
  return response.json();
}

// Usage
const post = await createPost('My Title', 'My content');
const profile = await getProfile();
await updatePost(post.id, { title: 'Updated' });`}
          language="javascript"
          title="Authenticated Requests"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Refreshing Tokens
        </h3>

        <CodeBlock
          code={`// Intercept 401 responses and retry with new token
async function fetchWithAuth(url, options = {}) {
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': \`Bearer \${getAccessToken()}\`
    }
  });

  // Token expired?
  if (response.status === 401) {
    console.log('Token expired, refreshing...');
    
    // Get new token
    const newToken = await refreshAccessToken();
    
    if (!newToken) {
      // Refresh failed, redirect to login
      window.location.href = '/login';
      return null;
    }

    // Retry with new token
    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': \`Bearer \${newToken}\`
      }
    });
  }

  return response;
}

// Refresh token function
async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    
    const response = await fetch('https://api.example.com/v1/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) {
      console.error('Refresh failed');
      return null;
    }

    const { accessToken, refreshToken: newRefreshToken, expiresIn } = 
      await response.json();

    // Update tokens
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    // Set new expiry timer
    setTimeout(() => {
      refreshAccessToken();
    }, (expiresIn - 60) * 1000);

    return accessToken;

  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

// Use it
const response = await fetchWithAuth('https://api.example.com/v1/posts');
const data = await response.json();`}
          language="javascript"
          title="Automatic Token Refresh"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Logout
        </h3>

        <CodeBlock
          code={`async function logout() {
  try {
    // Notify server (optional, but good practice)
    const refreshToken = localStorage.getItem('refreshToken');
    await fetch('https://api.example.com/v1/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${getAccessToken()}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });

  } catch (error) {
    console.error('Logout error:', error);
    // Continue with local cleanup even if server call fails
  }

  // Clear local storage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  // Redirect to home
  window.location.href = '/login';
}

// Call when user clicks logout
const logoutButton = document.getElementById('logout-btn');
logoutButton.addEventListener('click', logout);`}
          language="javascript"
          title="Logout Implementation"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Best Practices
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Never store tokens in cookies</strong> (unless httpOnly is set by server)</li>
          <li><strong>Use short-lived access tokens</strong> (15-30 minutes)</li>
          <li><strong>Use long-lived refresh tokens</strong> (7-30 days)</li>
          <li><strong>Store tokens in localStorage</strong> (or sessionStorage for more security)</li>
          <li><strong>Always use HTTPS</strong> - tokens are sent in headers</li>
          <li><strong>Refresh before expiry</strong> - Don't wait for 401, be proactive</li>
          <li><strong>Handle expiry gracefully</strong> - Don't let users get errors</li>
          <li><strong>Clear tokens on logout</strong> - Completely remove from storage</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Common Auth Errors
        </h3>

        <div className="space-y-3">
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <p className="font-semibold text-orange-900 dark:text-orange-300">401 Unauthorized</p>
            <p className="text-sm text-orange-800 dark:text-orange-200">Token missing, invalid, or expired. Check Authorization header.</p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <p className="font-semibold text-orange-900 dark:text-orange-300">403 Forbidden</p>
            <p className="text-sm text-orange-800 dark:text-orange-200">You're authenticated but don't have permission. Check your role/permissions.</p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <p className="font-semibold text-orange-900 dark:text-orange-300">Invalid Token</p>
            <p className="text-sm text-orange-800 dark:text-orange-200">Token is malformed or signature is invalid. Clear storage and login again.</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
