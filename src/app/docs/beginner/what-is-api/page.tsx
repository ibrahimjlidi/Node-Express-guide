import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "What is an API? - Beginner Guide",
  description: "Learn the basics of APIs from scratch",
};

export default function WhatIsApiPage() {
  return (
    <div>
      <Section title="What is an API?" id="what-is-api">
        <p>
          No worries if you're new to APIs! This guide will explain everything
          in simple terms.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Think of it Like a Restaurant
        </h3>

        <p>
          Imagine you go to a restaurant:
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>You</strong> = Your app/website
          </li>
          <li>
            <strong>Waiter</strong> = The API
          </li>
          <li>
            <strong>Menu</strong> = Available endpoints
          </li>
          <li>
            <strong>Kitchen</strong> = The server/database
          </li>
        </ul>

        <p className="mt-4">
          You ask the waiter (API) for food from the menu (endpoint). The waiter
          takes your order to the kitchen (server), prepares it, and brings back
          the result.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What Does API Stand For?
        </h3>

        <p>
          <strong>API</strong> = <strong>Application Programming Interface</strong>
        </p>

        <p>
          In simple terms: A way for two programs to talk to each other.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          How Does It Work?
        </h3>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded my-4">
          <div className="space-y-4">
            <div>
              <div className="font-bold text-blue-900 dark:text-blue-300">
                1. You Send a Request
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                Your app sends a message asking for something (e.g., "Get user photos")
              </p>
            </div>
            <div>
              <div className="font-bold text-blue-900 dark:text-blue-300">
                2. Server Processes It
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                The API receives your request and checks what you're asking for
              </p>
            </div>
            <div>
              <div className="font-bold text-blue-900 dark:text-blue-300">
                3. Server Sends Back Data
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                The API returns the information you asked for in a structured format
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          HTTP Methods (Simple Explanation)
        </h3>

        <p>
          APIs use HTTP methods to tell the server what you want to do:
        </p>

        <div className="overflow-x-auto bg-slate-50 dark:bg-slate-900 rounded-lg p-4 my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-4 py-2 text-left font-semibold">Method</th>
                <th className="px-4 py-2 text-left font-semibold">What It Means</th>
                <th className="px-4 py-2 text-left font-semibold">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-bold text-blue-600 dark:text-blue-400">
                  GET
                </td>
                <td className="px-4 py-2">Request information</td>
                <td className="px-4 py-2">"Give me user photos"</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-bold text-green-600 dark:text-green-400">
                  POST
                </td>
                <td className="px-4 py-2">Create something new</td>
                <td className="px-4 py-2">"Create a new post"</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 font-bold text-orange-600 dark:text-orange-400">
                  PUT
                </td>
                <td className="px-4 py-2">Update existing data</td>
                <td className="px-4 py-2">"Update my profile"</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-red-600 dark:text-red-400">
                  DELETE
                </td>
                <td className="px-4 py-2">Remove something</td>
                <td className="px-4 py-2">"Delete my post"</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What is JSON?
        </h3>

        <p>
          APIs usually return data in <strong>JSON</strong> format. It's just a way to
          organize information that computers can easily understand.
        </p>

        <CodeBlock
          code={`{
  "user": {
    "id": 1,
    "name": "John",
    "email": "john@example.com",
    "age": 25
  }
}`}
          language="json"
          title="Example JSON Response"
        />

        <p>
          It's like a labeled box (JSON) containing organized information.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Key Takeaways
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>API = A way for apps to communicate</li>
          <li>You send a request, the server sends back data</li>
          <li>HTTP methods: GET (read), POST (create), PUT (update), DELETE (remove)</li>
          <li>Data comes back in JSON format</li>
          <li>Think of it like ordering from a restaurant!</li>
        </ul>

        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded mt-8">
          <p className="font-semibold text-green-900 dark:text-green-300">
            Next Step: Ready to make your first request?
          </p>
          <p className="text-sm text-green-800 dark:text-green-200 mt-2">
            Head over to "Your First Request" to see real examples!
          </p>
        </div>
      </Section>
    </div>
  );
}
