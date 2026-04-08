import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "API Documentation - Posts Endpoints",
  description: "Post management API endpoints",
};

export default function PostsApiPage() {
  return (
    <div>
      <Section title="Posts Endpoints" id="posts-endpoints">
        <p>
          All post-related operations for creating, reading, updating, and
          deleting posts.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Create Post
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-green-600">
            POST
          </span>{" "}
          <span className="text-sm font-mono">/v1/posts</span>
        </div>

        <p>Create a new post. Requires authentication.</p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Request Body
        </h4>

        <CodeBlock
          code={`{
  "title": "My First Post",
  "content": "This is the content of my first post.",
  "category": "technology",
  "tags": ["javascript", "nodejs", "express"]
}`}
          language="json"
          title="Request Body"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Response
        </h4>

        <CodeBlock
          code={`{
  "success": true,
  "status": 201,
  "data": {
    "id": "post123",
    "title": "My First Post",
    "content": "This is the content of my first post.",
    "category": "technology",
    "tags": ["javascript", "nodejs", "express"],
    "author": {
      "id": "user123",
      "name": "John Doe"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Post created successfully"
}`}
          language="json"
          title="Success Response"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Get All Posts
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-blue-600">
            GET
          </span>{" "}
          <span className="text-sm font-mono">/v1/posts</span>
        </div>

        <p>Retrieve all published posts with pagination support.</p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Query Parameters
        </h4>

        <CodeBlock
          code={`page (number, optional) - Page number (default: 1)
limit (number, optional) - Posts per page (default: 10)
category (string, optional) - Filter by category
sort (string, optional) - Sort field (e.g., -createdAt for newest first)`}
          language="bash"
          title="Query Parameters"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Example Request
        </h4>

        <CodeBlock
          code={`GET /v1/posts?page=1&limit=10&sort=-createdAt`}
          language="bash"
          title="Example URL"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Response
        </h4>

        <CodeBlock
          code={`{
  "success": true,
  "status": 200,
  "data": {
    "posts": [
      {
        "id": "post123",
        "title": "My First Post",
        "excerpt": "This is the content...",
        "category": "technology",
        "author": {
          "id": "user123",
          "name": "John Doe"
        },
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalPosts": 47,
      "postsPerPage": 10
    }
  },
  "message": "Posts retrieved successfully"
}`}
          language="json"
          title="Success Response"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Get Post by ID
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-blue-600">
            GET
          </span>{" "}
          <span className="text-sm font-mono">/v1/posts/:id</span>
        </div>

        <p>Retrieve a specific post with full content and comments.</p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Update Post
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-orange-600">
            PUT
          </span>{" "}
          <span className="text-sm font-mono">/v1/posts/:id</span>
        </div>

        <p>
          Update a post. Only the post author or admin can update a post.
        </p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Request Body
        </h4>

        <CodeBlock
          code={`{
  "title": "Updated Title",
  "content": "Updated content...",
  "category": "technology",
  "tags": ["javascript", "nodejs"]
}`}
          language="json"
          title="Request Body (all fields optional)"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Delete Post
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-red-600">
            DELETE
          </span>{" "}
          <span className="text-sm font-mono">/v1/posts/:id</span>
        </div>

        <p>Delete a post. Only the post author or admin can delete a post.</p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Search Posts
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-blue-600">
            GET
          </span>{" "}
          <span className="text-sm font-mono">/v1/posts/search</span>
        </div>

        <p>Search posts by keyword, category, or tag.</p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Query Parameters
        </h4>

        <CodeBlock
          code={`q (string, required) - Search query
category (string, optional) - Filter by category
tag (string, optional) - Filter by tag`}
          language="bash"
          title="Query Parameters"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Example Request
        </h4>

        <CodeBlock
          code={`GET /v1/posts/search?q=javascript&category=technology`}
          language="bash"
          title="Example URL"
        />
      </Section>
    </div>
  );
}
