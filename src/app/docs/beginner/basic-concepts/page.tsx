import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Basic Concepts - Beginner Guide",
  description: "Learn fundamental API concepts",
};

export default function BasicConceptsPage() {
  return (
    <div>
      <Section title="Basic Concepts" id="basic-concepts">
        <p>
          Let's learn the fundamental concepts you need to understand APIs.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          URL Structure
        </h3>

        <p>
          An API URL tells the server exactly what you want. Think of it like an
          address for the data you're requesting.
        </p>

        <CodeBlock
          code={`https://api.example.com/v1/users/123?sort=name&limit=10
└─ ┬ ││     ││   ││  │    ││     │    ││         ││    
   │ ││     ││   ││  │    ││     │    ││         │└─ Query parameter (how many results)
   │ ││     ││   ││  │    ││     │    ││         └─ Query parameter (how to sort)
   │ ││     ││   ││  │    ││     │    │└─ Query separator (starts parameters)
   │ ││     ││   ││  │    ││     │    └─ Parameter (the user ID we want)
   │ ││     ││   ││  │    ││     └─ Resource (what we're asking for)
   │ ││     ││   ││  │    │└─ API version
   │ ││     ││   ││  │    └─ Path start
   │ ││     ││   ││  └─ Domain
   │ ││     │└─ ┬─┘
   │ ││     │   └─ Server name
   │ ││     └─ Subdomain
   │ │└─ Domain extension
   │ └─ Domain
   └─ Protocol (HTTPS = secure)`}
          language="bash"
          title="Understanding URLs"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Query Parameters
        </h3>

        <p>
          Query parameters are extras you add to your URL to filter or customize results.
          They start with <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">?</code> and are separated by <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">&amp;</code>
        </p>

        <div className="space-y-3">
          <CodeBlock
            code={`https://api.example.com/v1/posts?category=tech&limit=5`}
            language="bash"
            title="Example: Get 5 tech posts"
          />

          <CodeBlock
            code={`https://api.example.com/v1/posts?page=2`}
            language="bash"
            title="Example: Get page 2 of posts"
          />

          <CodeBlock
            code={`https://api.example.com/v1/posts?search=javascript&sort=-date`}
            language="bash"
            title="Example: Search for JavaScript posts, newest first"
          />
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          HTTP Methods Recap
        </h3>

        <p>
          HTTP methods tell the server what action you want to perform:
        </p>

        <div className="space-y-3 my-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
            <p className="font-bold text-blue-900 dark:text-blue-300">GET - Retrieve Data</p>
            <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
              Read information from the server. Think: "Show me..."
            </p>
            <code className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded block mt-2">
              curl https://api.example.com/v1/users/123
            </code>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded">
            <p className="font-bold text-green-900 dark:text-green-300">POST - Create Data</p>
            <p className="text-sm text-green-800 dark:text-green-200 mt-1">
              Send new data to the server. Think: "Create..."
            </p>
            <code className="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded block mt-2">
              curl -X POST [url] -d '{`{name: "John"}`}'
            </code>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded">
            <p className="font-bold text-orange-900 dark:text-orange-300">PUT - Update Data</p>
            <p className="text-sm text-orange-800 dark:text-orange-200 mt-1">
              Modify existing data. Think: "Change..."
            </p>
            <code className="text-xs bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded block mt-2">
              curl -X PUT [url] -d '{`{name: "Jane"}`}'
            </code>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-900 dark:text-red-300">DELETE - Remove Data</p>
            <p className="text-sm text-red-800 dark:text-red-200 mt-1">
              Delete data. Think: "Remove..."
            </p>
            <code className="text-xs bg-red-100 dark:bg-red-900 px-2 py-1 rounded block mt-2">
              curl -X DELETE [url]
            </code>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          HTTP Status Codes (Simple Version)
        </h3>

        <p>
          The server responds with a number that tells you what happened:
        </p>

        <div className="overflow-x-auto bg-slate-50 dark:bg-slate-900 rounded-lg p-4 my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-4 py-2 text-left font-semibold">Code</th>
                <th className="px-4 py-2 text-left font-semibold">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-bold text-green-600">200</td>
                <td className="px-4 py-2">✅ Success! Everything worked</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-bold text-green-600">201</td>
                <td className="px-4 py-2">✅ Created! New item was made</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-bold text-red-600">400</td>
                <td className="px-4 py-2">❌ Bad Request - Your data was wrong</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-bold text-red-600">401</td>
                <td className="px-4 py-2">❌ Unauthorized - Need to log in</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-bold text-red-600">404</td>
                <td className="px-4 py-2">❌ Not Found - Item doesn't exist</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-bold text-orange-600">500</td>
                <td className="px-4 py-2">⚠️ Server Error - Problem on their end</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Headers (Extra Information)
        </h3>

        <p>
          Headers are like envelopes - they contain extra information about your request:
        </p>

        <CodeBlock
          code={`curl https://api.example.com/v1/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN"`}
          language="bash"
          title="Request with Headers"
        />

        <p className="text-sm mt-4">
          <strong>Content-Type:</strong> Tells the server what format your data is in<br/>
          <strong>Authorization:</strong> Proves who you are (like showing ID)
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Request Body (Data You Send)
        </h3>

        <p>
          For POST and PUT requests, you send data to the server in a "body":
        </p>

        <CodeBlock
          code={`curl -X POST https://api.example.com/v1/posts \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "My First Post",
    "content": "Hello, world!"
  }'`}
          language="bash"
          title="Sending Data"
        />

        <p className="text-sm mt-4">
          The <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">-d</code> flag means "data" - this is what we're sending.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Quick Summary
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>URL</strong> - Where to send the request</li>
          <li><strong>Method</strong> - What you want to do (GET, POST, etc.)</li>
          <li><strong>Headers</strong> - Extra information about the request</li>
          <li><strong>Body</strong> - Data you're sending (for POST/PUT)</li>
          <li><strong>Status Code</strong> - The response telling you what happened</li>
        </ul>
      </Section>
    </div>
  );
}
