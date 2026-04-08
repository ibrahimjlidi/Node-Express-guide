import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "API Documentation - Comments Endpoints",
  description: "Comment management API endpoints",
};

export default function CommentsApiPage() {
  return (
    <div>
      <Section title="Comments Endpoints" id="comments-endpoints">
        <p>
          All comment-related operations for managing comments on posts.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Create Comment
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-green-600">
            POST
          </span>{" "}
          <span className="text-sm font-mono">/v1/posts/:postId/comments</span>
        </div>

        <p>Add a new comment to a post. Requires authentication.</p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Request Body
        </h4>

        <CodeBlock
          code={`{
  "content": "Great post! Very informative.",
  "parentCommentId": "optional_parent_comment_id_for_nested_comments"
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
    "id": "comment123",
    "content": "Great post! Very informative.",
    "postId": "post123",
    "author": {
      "id": "user123",
      "name": "John Doe"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "likes": 0
  },
  "message": "Comment created successfully"
}`}
          language="json"
          title="Success Response"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Get Post Comments
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-blue-600">
            GET
          </span>{" "}
          <span className="text-sm font-mono">/v1/posts/:postId/comments</span>
        </div>

        <p>Retrieve all comments for a specific post.</p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Query Parameters
        </h4>

        <CodeBlock
          code={`page (number, optional) - Page number (default: 1)
limit (number, optional) - Comments per page (default: 20)
sort (string, optional) - Sort field (e.g., -createdAt)`}
          language="bash"
          title="Query Parameters"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Response
        </h4>

        <CodeBlock
          code={`{
  "success": true,
  "status": 200,
  "data": {
    "comments": [
      {
        "id": "comment123",
        "content": "Great post! Very informative.",
        "author": {
          "id": "user123",
          "name": "John Doe"
        },
        "likes": 5,
        "createdAt": "2024-01-15T10:30:00Z",
        "replies": [
          {
            "id": "reply123",
            "content": "Thanks for reading!",
            "author": {
              "id": "user456",
              "name": "Jane Smith"
            },
            "likes": 2,
            "createdAt": "2024-01-15T11:00:00Z"
          }
        ]
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalComments": 42
    }
  },
  "message": "Comments retrieved successfully"
}`}
          language="json"
          title="Success Response"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Get Comment by ID
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-blue-600">
            GET
          </span>{" "}
          <span className="text-sm font-mono">/v1/comments/:commentId</span>
        </div>

        <p>Retrieve a specific comment with all its details.</p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Update Comment
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-orange-600">
            PUT
          </span>{" "}
          <span className="text-sm font-mono">/v1/comments/:commentId</span>
        </div>

        <p>
          Update a comment. Only the comment author or admin can update a
          comment.
        </p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Request Body
        </h4>

        <CodeBlock
          code={`{
  "content": "Updated comment content"
}`}
          language="json"
          title="Request Body"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Delete Comment
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-red-600">
            DELETE
          </span>{" "}
          <span className="text-sm font-mono">/v1/comments/:commentId</span>
        </div>

        <p>Delete a comment. Only the comment author or admin can delete a comment.</p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Like Comment
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-green-600">
            POST
          </span>{" "}
          <span className="text-sm font-mono">/v1/comments/:commentId/like</span>
        </div>

        <p>
          Like or unlike a comment. Requires authentication.
        </p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Response
        </h4>

        <CodeBlock
          code={`{
  "success": true,
  "status": 200,
  "data": {
    "commentId": "comment123",
    "likes": 6,
    "isLiked": true
  },
  "message": "Comment liked successfully"
}`}
          language="json"
          title="Success Response"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Reply to Comment
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-green-600">
            POST
          </span>{" "}
          <span className="text-sm font-mono">/v1/comments/:commentId/reply</span>
        </div>

        <p>
          Reply to an existing comment. Requires authentication.
        </p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Request Body
        </h4>

        <CodeBlock
          code={`{
  "content": "Thanks for your feedback!"
}`}
          language="json"
          title="Request Body"
        />
      </Section>
    </div>
  );
}
