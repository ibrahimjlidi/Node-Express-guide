import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Getting Started - Intermediate Guide",
  description: "Set up your development environment for API development",
};

export default function IntermediateGettingStartedPage() {
  return (
    <div>
      <Section title="Getting Started - Intermediate" id="getting-started-intermediate">
        <p>
          Now that you understand the basics, let's set up a professional development
          environment to build and test your API interactions.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Choose Your Tool
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          1. Node.js (JavaScript)
        </h4>

        <CodeBlock
          code={`# Install Node.js from https://nodejs.org

# Create a new project
mkdir my-api-project
cd my-api-project
npm init -y

# Install axios for HTTP requests
npm install axios

# Create index.js
cat > index.js << 'EOF'
const axios = require('axios');

async function getUser(userId) {
  try {
    const response = await axios.get(
      \`https://api.example.com/v1/users/\${userId}\`,
      {
        headers: {
          'Authorization': 'Bearer YOUR_TOKEN'
        }
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getUser('user123');
EOF

# Run it
node index.js`}
          language="bash"
          title="Node.js Setup"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          2. Python
        </h4>

        <CodeBlock
          code={`# Install Python from https://www.python.org

# Create a virtual environment
python -m venv venv

# Activate it
# On Windows:
venv\\Scripts\\activate
# On Mac/Linux:
source venv/bin/activate

# Install requests
pip install requests

# Create main.py
cat > main.py << 'EOF'
import requests

def get_user(user_id):
    url = f'https://api.example.com/v1/users/{user_id}'
    headers = {
        'Authorization': 'Bearer YOUR_TOKEN'
    }
    
    response = requests.get(url, headers=headers)
    print(response.json())

get_user('user123')
EOF

# Run it
python main.py`}
          language="bash"
          title="Python Setup"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          3. Postman (GUI)
        </h4>

        <p>
          Postman is a visual tool - no coding needed!
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Download from https://www.postman.com</li>
          <li>Create a new request</li>
          <li>Set method to GET</li>
          <li>Enter URL: https://api.example.com/v1/users/123</li>
          <li>Go to Headers tab</li>
          <li>Add header: Authorization: Bearer YOUR_TOKEN</li>
          <li>Click Send</li>
        </ol>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Getting Your API Token
        </h3>

        <CodeBlock
          code={`# Step 1: Register
POST /api/auth/register
{
  "email": "you@example.com",
  "password": "SecurePassword123!",
  "name": "Your Name"
}

# Response:
{
  "success": true,
  "userId": "user123"
}

# Step 2: Login to get token
POST /api/auth/login
{
  "email": "you@example.com",
  "password": "SecurePassword123!"
}

# Response:
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}

# Save your token somewhere safe (NOT in code!)
# On Mac/Linux, add to .bashrc or .zshrc:
export API_TOKEN="eyJhbGc..."

# On Windows PowerShell:
$env:API_TOKEN="eyJhbGc..."

# Then use it in requests:
Authorization: Bearer $API_TOKEN`}
          language="bash"
          title="Getting a Token"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          First Authenticated Request
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          JavaScript/Node.js
        </h4>

        <CodeBlock
          code={`const axios = require('axios');

async function makeRequest() {
  const token = process.env.API_TOKEN;

  try {
    // Create a post
    const createResponse = await axios.post(
      'https://api.example.com/v1/posts',
      {
        title: 'My First Post via API',
        content: 'This was created programmatically!',
        category: 'technology'
      },
      {
        headers: {
          'Authorization': \`Bearer \${token}\`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Post created:', createResponse.data);

    // Get your posts
    const getResponse = await axios.get(
      'https://api.example.com/v1/posts',
      {
        headers: {
          'Authorization': \`Bearer \${token}\`
        },
        params: {
          page: 1,
          limit: 20
        }
      }
    );

    console.log('Your posts:', getResponse.data);

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

makeRequest();`}
          language="javascript"
          title="Making Authenticated Requests"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Python
        </h4>

        <CodeBlock
          code={`import requests
import os

token = os.getenv('API_TOKEN')

# Create a post
create_url = 'https://api.example.com/v1/posts'
create_data = {
    'title': 'My First Post via API',
    'content': 'This was created programmatically!',
    'category': 'technology'
}
headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json'
}

response = requests.post(create_url, json=create_data, headers=headers)
print('Post created:', response.json())

# Get your posts
get_url = 'https://api.example.com/v1/posts'
params = {'page': 1, 'limit': 20}

response = requests.get(get_url, headers=headers, params=params)
print('Your posts:', response.json())`}
          language="python"
          title="Making Authenticated Requests (Python)"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Common Issues & Fixes
        </h3>

        <div className="space-y-3">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <p className="font-semibold text-red-900 dark:text-red-300">401 Unauthorized</p>
            <p className="text-sm text-red-800 dark:text-red-200 mt-2">
              Token is missing or invalid. Check that you're sending the Authorization header.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <p className="font-semibold text-red-900 dark:text-red-300">400 Bad Request</p>
            <p className="text-sm text-red-800 dark:text-red-200 mt-2">
              Request data is invalid. Check the required fields and data types.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <p className="font-semibold text-red-900 dark:text-red-300">ECONNREFUSED</p>
            <p className="text-sm text-red-800 dark:text-red-200 mt-2">
              Can't connect to the API. Check the URL and internet connection.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <p className="font-semibold text-red-900 dark:text-red-300">CORS Error</p>
            <p className="text-sm text-red-800 dark:text-red-200 mt-2">
              Can only happen in browser. Use a proxy or server-side request instead.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Next Steps
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="/docs/intermediate/authentication" className="text-blue-600 dark:text-blue-400 hover:underline">
              Learn about Authentication
            </a>
          </li>
          <li>
            <a href="/docs/intermediate/crud-operations" className="text-blue-600 dark:text-blue-400 hover:underline">
              Master CRUD Operations
            </a>
          </li>
          <li>
            <a href="/docs/intermediate/error-handling" className="text-blue-600 dark:text-blue-400 hover:underline">
              Handle Errors Gracefully
            </a>
          </li>
        </ul>
      </Section>
    </div>
  );
}
