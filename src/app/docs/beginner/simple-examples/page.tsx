import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Simple Examples - Beginner Guide",
  description: "Practical examples of working with APIs",
};

export default function SimpleExamplesPage() {
  return (
    <div>
      <Section title="Simple Examples" id="simple-examples">
        <p>
          Learn by example! Here are practical, real-world scenarios to help you
          understand how APIs work in practice.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Example 1: Get Trending Posts
        </h3>

        <p>
          Get the most popular posts from the last week.
        </p>

        <CodeBlock
          code={`# Using cURL
curl -X GET "https://api.example.com/v1/posts?sort=trending&limit=10" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"

# Response
{
  "status": "success",
  "data": {
    "posts": [
      {
        "id": "post_1",
        "title": "How to Learn APIs",
        "content": "A comprehensive guide...",
        "author": { "id": "user_1", "name": "John Doe" },
        "likes": 1234,
        "comments": 56,
        "createdAt": "2024-01-10T15:30:00Z"
      },
      {
        "id": "post_2",
        "title": "API Best Practices",
        "content": "10 things every developer...",
        "author": { "id": "user_2", "name": "Jane Smith" },
        "likes": 890,
        "comments": 34,
        "createdAt": "2024-01-11T10:20:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 250
    }
  }
}`}
          language="bash"
          title="Get Trending Posts"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Example 2: Create a Post
        </h3>

        <CodeBlock
          code={`# Using cURL
curl -X POST "https://api.example.com/v1/posts" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "My First API Post",
    "content": "This is my first post using the API!",
    "category": "technology"
  }'

# Success Response (201 Created)
{
  "status": "success",
  "data": {
    "id": "post_456",
    "title": "My First API Post",
    "content": "This is my first post using the API!",
    "category": "technology",
    "authorId": "user_123",
    "createdAt": "2024-01-15T14:45:00Z",
    "updatedAt": "2024-01-15T14:45:00Z",
    "likes": 0,
    "comments": 0
  }
}

# Error Response (400 Bad Request)
{
  "status": "error",
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}`}
          language="bash"
          title="Create a Post"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Example 3: Like a Post
        </h3>

        <CodeBlock
          code={`# Using cURL
curl -X POST "https://api.example.com/v1/posts/post_1/like" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"

# Success Response
{
  "status": "success",
  "message": "Post liked successfully",
  "data": {
    "postId": "post_1",
    "likeCount": 1235,
    "liked": true
  }
}

# If you already liked it
{
  "status": "error",
  "statusCode": 400,
  "message": "You already liked this post"
}`}
          language="bash"
          title="Like a Post"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Example 4: Comment on a Post
        </h3>

        <CodeBlock
          code={`# Using cURL
curl -X POST "https://api.example.com/v1/posts/post_1/comments" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "This is a great post! Thanks for sharing."
  }'

# Success Response (201 Created)
{
  "status": "success",
  "data": {
    "id": "comment_789",
    "postId": "post_1",
    "authorId": "user_123",
    "author": {
      "id": "user_123",
      "name": "Your Name",
      "avatar": "https://..."
    },
    "content": "This is a great post! Thanks for sharing.",
    "createdAt": "2024-01-15T15:00:00Z",
    "likes": 0
  }
}`}
          language="bash"
          title="Comment on a Post"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Example 5: Update Your Profile
        </h3>

        <CodeBlock
          code={`# Using cURL
curl -X PUT "https://api.example.com/v1/user/profile" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "bio": "Passionate about APIs and web development",
    "location": "San Francisco, CA",
    "website": "https://mywebsite.com"
  }'

# Response
{
  "status": "success",
  "data": {
    "id": "user_123",
    "name": "Your Name",
    "email": "you@example.com",
    "bio": "Passionate about APIs and web development",
    "location": "San Francisco, CA",
    "website": "https://mywebsite.com",
    "avatar": "https://...",
    "createdAt": "2023-06-01T10:00:00Z",
    "updatedAt": "2024-01-15T15:05:00Z"
  }
}`}
          language="bash"
          title="Update Your Profile"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Example 6: Search Posts
        </h3>

        <CodeBlock
          code={`# Using cURL - Search with filters
curl -X GET "https://api.example.com/v1/posts?search=apis&category=technology&sort=recent&limit=20" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"

# Response
{
  "status": "success",
  "data": {
    "posts": [
      {
        "id": "post_1",
        "title": "Getting Started with APIs",
        "snippet": "Learn the fundamentals of API design and usage...",
        "category": "technology",
        "likes": 245,
        "createdAt": "2024-01-14T09:30:00Z"
      },
      // More posts...
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 145,
      "hasMore": true
    }
  }
}`}
          language="bash"
          title="Search Posts"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Example 7: Handle Errors
        </h3>

        <CodeBlock
          code={`# Trying to get a post that doesn't exist
curl -X GET "https://api.example.com/v1/posts/nonexistent" \\
  -H "Authorization: Bearer YOUR_TOKEN"

# 404 Not Found Response
{
  "status": "error",
  "statusCode": 404,
  "message": "Post not found",
  "code": "POST_NOT_FOUND"
}

# Trying to access without authentication
curl -X GET "https://api.example.com/v1/user/profile"
# (no authorization header)

# 401 Unauthorized Response
{
  "status": "error",
  "statusCode": 401,
  "message": "Unauthorized - Token required",
  "code": "MISSING_TOKEN"
}`}
          language="bash"
          title="Error Responses"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Key Takeaways
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>Always include the Authorization header with your token</li>
          <li>Different status codes mean different things (200, 201, 400, 401, 404)</li>
          <li>Check the response structure to understand what data you got back</li>
          <li>Errors provide helpful messages about what went wrong</li>
          <li>Use query parameters to filter and sort results</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded mt-8">
          <p className="font-semibold text-blue-900 dark:text-blue-300">
            💡 Pro Tip
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
            Try these examples yourself using cURL or Postman. Experiment with different parameters
            and see what happens!
          </p>
        </div>
      </Section>
    </div>
  );
}
