import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "CRUD Operations - Intermediate Guide",
  description: "Create, Read, Update, Delete operations",
};

export default function CrudOperationsPage() {
  return (
    <div>
      <Section title="CRUD Operations" id="crud-operations">
        <p>
          CRUD is how you manage data: <strong>Create</strong>, <strong>Read</strong>,{" "}
          <strong>Update</strong>, <strong>Delete</strong>.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          C - CREATE (POST)
        </h3>

        <p>
          Making a POST request creates new data on the server.
        </p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          JavaScript Example
        </h4>

        <CodeBlock
          code={`async function createPost() {
  const response = await fetch('https://api.example.com/v1/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN'
    },
    body: JSON.stringify({
      title: 'My New Post',
      content: 'This is amazing!',
      category: 'technology'
    })
  });

  const data = await response.json();
  console.log('Post created:', data);
}

createPost();`}
          language="javascript"
          title="Creating a Post"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Python Example
        </h4>

        <CodeBlock
          code={`import requests

url = 'https://api.example.com/v1/posts'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
}
data = {
    'title': 'My New Post',
    'content': 'This is amazing!',
    'category': 'technology'
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`}
          language="python"
          title="Creating a Post (Python)"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          R - READ (GET)
        </h3>

        <p>
          GET requests retrieve existing data from the server.
        </p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Get Single Post
        </h4>

        <CodeBlock
          code={`async function getPost(postId) {
  const response = await fetch(
    \`https://api.example.com/v1/posts/\${postId}\`,
    {
      headers: {
        'Authorization': 'Bearer YOUR_TOKEN'
      }
    }
  );

  const data = await response.json();
  console.log('Post:', data.data);
}

getPost('post123');`}
          language="javascript"
          title="Reading a Single Post"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Get List of Posts
        </h4>

        <CodeBlock
          code={`async function getAllPosts(page = 1, limit = 10) {
  const url = new URL('https://api.example.com/v1/posts');
  url.searchParams.append('page', page);
  url.searchParams.append('limit', limit);

  const response = await fetch(url, {
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN'
    }
  });

  const data = await response.json();
  console.log('Posts:', data.data.posts);
  console.log('Total:', data.data.pagination.totalPosts);
}

getAllPosts(1, 20);`}
          language="javascript"
          title="Reading Multiple Posts"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          U - UPDATE (PUT)
        </h3>

        <p>
          PUT requests modify existing data.
        </p>

        <CodeBlock
          code={`async function updatePost(postId, newData) {
  const response = await fetch(
    \`https://api.example.com/v1/posts/\${postId}\`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN'
      },
      body: JSON.stringify(newData)
    }
  );

  const data = await response.json();
  console.log('Updated post:', data.data);
}

updatePost('post123', {
  title: 'Updated Title',
  content: 'Updated content here'
});`}
          language="javascript"
          title="Updating a Post"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          D - DELETE
        </h3>

        <p>
          DELETE requests remove data from the server.
        </p>

        <CodeBlock
          code={`async function deletePost(postId) {
  const response = await fetch(
    \`https://api.example.com/v1/posts/\${postId}\`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer YOUR_TOKEN'
      }
    }
  );

  if (response.ok) {
    console.log('Post deleted successfully');
  } else {
    console.log('Error:', response.status);
  }
}

deletePost('post123');`}
          language="javascript"
          title="Deleting a Post"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Complete Example: Todo App
        </h3>

        <CodeBlock
          code={`class TodoManager {
  constructor(apiUrl, token) {
    this.apiUrl = apiUrl;
    this.token = token;
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${this.token}\`
    };
  }

  async create(title, description) {
    const res = await fetch(\`\${this.apiUrl}/todos\`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ title, description })
    });
    return res.json();
  }

  async getAll(page = 1) {
    const res = await fetch(\`\${this.apiUrl}/todos?page=\${page}\`, {
      headers: this.getHeaders()
    });
    return res.json();
  }

  async get(id) {
    const res = await fetch(\`\${this.apiUrl}/todos/\${id}\`, {
      headers: this.getHeaders()
    });
    return res.json();
  }

  async update(id, updates) {
    const res = await fetch(\`\${this.apiUrl}/todos/\${id}\`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(updates)
    });
    return res.json();
  }

  async delete(id) {
    const res = await fetch(\`\${this.apiUrl}/todos/\${id}\`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return res.ok;
  }
}

// Usage
const todos = new TodoManager('https://api.example.com/v1', 'YOUR_TOKEN');

await todos.create('Learn APIs', 'Master API concepts');
const allTodos = await todos.getAll(1);
await todos.update('todo123', { completed: true });
await todos.delete('todo123');`}
          language="javascript"
          title="Complete CRUD Class"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Key Points to Remember
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>Always include <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Authorization</code> header for protected routes</li>
          <li>POST/PUT need <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Content-Type: application/json</code> header</li>
          <li>Check <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">response.ok</code> or <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">response.status</code> for errors</li>
          <li>Always use IDs to target specific resources</li>
          <li>Send data in the body for POST/PUT requests</li>
        </ul>
      </Section>
    </div>
  );
}
