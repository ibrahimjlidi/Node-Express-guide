import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "API Documentation - Users Endpoints",
  description: "User management API endpoints",
};

export default function UsersApiPage() {
  return (
    <div>
      <Section title="Users Endpoints" id="users-endpoints">
        <p>
          All user-related operations including registration, authentication,
          and profile management.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Register User
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-green-600">
            POST
          </span>{" "}
          <span className="text-sm font-mono">/v1/users/register</span>
        </div>

        <p>Create a new user account.</p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Request Body
        </h4>

        <CodeBlock
          code={`{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
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
    "id": "user123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "User registered successfully"
}`}
          language="json"
          title="Success Response"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Login User
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-green-600">
            POST
          </span>{" "}
          <span className="text-sm font-mono">/v1/auth/login</span>
        </div>

        <p>Authenticate a user and receive JWT tokens.</p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Request Body
        </h4>

        <CodeBlock
          code={`{
  "email": "john@example.com",
  "password": "securePassword123"
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
          title="Success Response"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Get User Profile
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-blue-600">
            GET
          </span>{" "}
          <span className="text-sm font-mono">/v1/users/profile</span>
        </div>

        <p>
          Retrieve the authenticated user's profile. Requires authentication.
        </p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Headers
        </h4>

        <CodeBlock
          code={`Authorization: Bearer <access_token>`}
          language="bash"
          title="Required Header"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Response
        </h4>

        <CodeBlock
          code={`{
  "success": true,
  "status": 200,
  "data": {
    "id": "user123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Profile retrieved successfully"
}`}
          language="json"
          title="Success Response"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Update User Profile
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-orange-600">
            PUT
          </span>{" "}
          <span className="text-sm font-mono">/v1/users/profile</span>
        </div>

        <p>Update the authenticated user's profile.</p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Request Body
        </h4>

        <CodeBlock
          code={`{
  "name": "Jane Doe",
  "email": "jane@example.com"
}`}
          language="json"
          title="Request Body (all fields optional)"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Get User by ID
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-blue-600">
            GET
          </span>{" "}
          <span className="text-sm font-mono">/v1/users/:id</span>
        </div>

        <p>Retrieve a specific user's public profile.</p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Parameters
        </h4>

        <CodeBlock
          code={`id (string, required) - User ID`}
          language="bash"
          title="Path Parameters"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Delete User Account
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg mb-4">
          <span className="text-sm font-mono font-bold text-red-600">
            DELETE
          </span>{" "}
          <span className="text-sm font-mono">/v1/users/profile</span>
        </div>

        <p>Delete the authenticated user's account.</p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-4 mb-2">
          Response
        </h4>

        <CodeBlock
          code={`{
  "success": true,
  "status": 200,
  "message": "User account deleted successfully"
}`}
          language="json"
          title="Success Response"
        />
      </Section>
    </div>
  );
}
