import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Introduction - API Documentation",
  description: "Learn about the Node.js and Express.js backend API",
};

export default function IntroductionPage() {
  return (
    <div>
      <Section title="Introduction" id="introduction">
        <p>
          Welcome to the comprehensive API documentation for our Node.js and
          Express.js backend server. This documentation provides detailed
          information about all available endpoints, authentication mechanisms,
          and best practices for integrating with our API.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What is this API?
        </h3>
        <p>
          Our API is a RESTful web service built with Node.js and Express.js
          that provides access to a complete content management system. It
          supports user management, post creation and management, and comment
          systems with full authentication and authorization.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Key Features
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>RESTful Architecture</strong>: Standard HTTP methods (GET,
            POST, PUT, DELETE)
          </li>
          <li>
            <strong>JWT Authentication</strong>: Secure token-based authentication
          </li>
          <li>
            <strong>Role-Based Access Control</strong>: User, Moderator, and Admin
            roles
          </li>
          <li>
            <strong>Comprehensive Error Handling</strong>: Detailed error messages
            and status codes
          </li>
          <li>
            <strong>Input Validation</strong>: Request validation and sanitization
          </li>
          <li>
            <strong>Rate Limiting</strong>: API request rate limiting
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Base URL
        </h3>
        <CodeBlock
          code="https://api.example.com/v1"
          language="bash"
          title="Base API URL"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          API Version
        </h3>
        <p>
          This documentation covers API version <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">v1</code>. We maintain backward
          compatibility with previous versions, but recommend using the latest
          version for new integrations.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Response Format
        </h3>
        <p>
          All responses are returned in JSON format. Successful responses include
          data, while error responses include descriptive error messages and codes.
        </p>

        <CodeBlock
          code={`{
  "success": true,
  "status": 200,
  "data": {
    "id": "user123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User retrieved successfully"
}`}
          language="json"
          title="Example Response"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Getting Started
        </h3>
        <p>
          New users should start with the{" "}
          <a href="/docs/getting-started" className="text-blue-600 dark:text-blue-400 hover:underline">
            Getting Started guide
          </a>{" "}
          to set up their first API calls. Advanced users can jump directly to
          the{" "}
          <a href="/docs/api" className="text-blue-600 dark:text-blue-400 hover:underline">
            API Documentation
          </a>
          .
        </p>
      </Section>
    </div>
  );
}
