import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Your First Request - Beginner Guide",
  description: "Make your very first API request in 5 minutes",
};

export default function FirstRequestPage() {
  return (
    <div>
      <Section title="Your First Request" id="first-request">
        <p>
          Let's make your very first API request! Don't worry - we'll take it
          step by step.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What You'll Need
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>A tool to make requests (we'll use cURL - it's built-in!)</li>
          <li>A terminal/command line (PowerShell, Terminal, or Command Prompt)</li>
          <li>That's it!</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What is cURL?
        </h3>

        <p>
          cURL is a simple tool that lets you send requests to APIs from your
          computer's terminal. Think of it as a messenger that delivers your request
          and brings back the response.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Step 1: Open Your Terminal
        </h3>

        <p>
          <strong>On Windows:</strong> Press <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Win + R</code>, type <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">cmd</code>, press Enter
        </p>

        <p>
          <strong>On Mac/Linux:</strong> Press <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Cmd + Space</code>, search for "Terminal"
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Step 2: Make Your First Request
        </h3>

        <p>
          Copy this command and paste it into your terminal:
        </p>

        <CodeBlock
          code={`curl https://api.example.com/v1/posts?limit=3`}
          language="bash"
          title="Get 3 Posts"
        />

        <p>
          Then press <strong>Enter</strong>.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Step 3: See the Response
        </h3>

        <p>
          You should see something like this:
        </p>

        <CodeBlock
          code={`{
  "success": true,
  "status": 200,
  "data": {
    "posts": [
      {
        "id": "post1",
        "title": "Introduction to APIs",
        "content": "Learn how APIs work...",
        "author": "John Doe",
        "createdAt": "2024-01-15T10:00:00Z"
      },
      {
        "id": "post2",
        "title": "API Best Practices",
        "content": "Tips for using APIs...",
        "author": "Jane Smith",
        "createdAt": "2024-01-14T15:30:00Z"
      }
    ]
  },
  "message": "Posts retrieved successfully"
}`}
          language="json"
          title="What You'll See"
        />

        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded my-4">
          <p className="font-semibold text-green-900 dark:text-green-300">
            Congratulations! 🎉
          </p>
          <p className="text-sm text-green-800 dark:text-green-200 mt-2">
            You just made your first API request! That was easy, right?
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Let's Break Down What Just Happened
        </h3>

        <CodeBlock
          code={`curl https://api.example.com/v1/posts?limit=3
│    │    │                                      │
│    │    │                                      └── "Give me only 3 posts"
│    │    │
│    │    └── The API address
│    │
│    └── The tool we're using
│
└── The command we're running`}
          language="bash"
          title="Breaking Down the Command"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Try Other Examples
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Get a single user
        </h4>

        <CodeBlock
          code={`curl https://api.example.com/v1/users/user123`}
          language="bash"
          title="Get Specific User"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Get posts from a specific category
        </h4>

        <CodeBlock
          code={`curl https://api.example.com/v1/posts?category=technology`}
          language="bash"
          title="Get Posts by Category"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Get your profile (requires login)
        </h4>

        <CodeBlock
          code={`curl https://api.example.com/v1/users/profile \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE"`}
          language="bash"
          title="Authenticated Request"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Understanding the Response
        </h3>

        <p>
          Every API response contains:
        </p>

        <div className="overflow-x-auto bg-slate-50 dark:bg-slate-900 rounded-lg p-4 my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-4 py-2 text-left font-semibold">Field</th>
                <th className="px-4 py-2 text-left font-semibold">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-mono">success</td>
                <td className="px-4 py-2">Did it work? (true/false)</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-mono">status</td>
                <td className="px-4 py-2">The result code (200 = success)</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-mono">data</td>
                <td className="px-4 py-2">The information you asked for</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">message</td>
                <td className="px-4 py-2">Human-readable explanation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What's That Backslash (\\)?
        </h3>

        <p>
          In the multi-line example above, the backslash <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">\\</code> means
          "this command continues on the next line". You can either:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Type it on one line (remove the backslash)</li>
          <li>Or type it exactly as shown (copy-paste it whole)</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Common Questions
        </h3>

        <div className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold text-yellow-900 dark:text-yellow-300">
              Q: I got an error. What happened?
            </p>
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-2">
              A: Check that you copied the command exactly. Make sure your internet
              connection is active.
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold text-yellow-900 dark:text-yellow-300">
              Q: Why does my screen look messy?
            </p>
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-2">
              A: That's normal! Try typing <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">curl -s [url] | python -m json.tool</code> to make it prettier.
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold text-yellow-900 dark:text-yellow-300">
              Q: What's next?
            </p>
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-2">
              A: Check out "Basic Concepts" to learn more about URLs, parameters, and more!
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
