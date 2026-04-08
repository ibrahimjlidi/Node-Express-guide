import { Section } from "@/components";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common API questions",
};

export default function FAQsPage() {
  return (
    <div>
      <Section title="Frequently Asked Questions" id="faqs">
        <p>
          Answers to the most common questions about APIs and this documentation.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          General Questions
        </h3>

        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: Do I need to learn programming to use APIs?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              You don't need to be a programmer initially! You can start with cURL or Postman 
              without writing any code. Once you're comfortable, learning a programming language 
              like JavaScript or Python will make things easier.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: How long does it take to learn APIs?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              <strong>Basics (Beginner):</strong> 1-2 weeks of casual learning
              <br/><strong>Intermediate skills:</strong> 1-2 months with practice
              <br/><strong>Advanced techniques:</strong> 3-6 months of dedicated study
              <br/>
              Speed depends on your background and how much you practice!
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: What's the difference between REST API and other APIs?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              REST is a style/pattern for designing APIs. Other types include SOAP, GraphQL, and RPC.
              REST is the most common for web APIs today. 95% of public APIs use REST.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: Can I use APIs without a terminal?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              Absolutely! Tools like Postman, Insomnia, or Thunder Client let you make API calls
              with a visual interface. No terminal needed!
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Authentication Questions
        </h3>

        <div className="space-y-6">
          <div className="border-l-4 border-purple-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: What's a token and why do I need it?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              A token is proof that you're logged in. It's like a ticket - it tells the server 
              "this request is from an authenticated user." Without it, the server doesn't know 
              who you are and won't let you access protected resources.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: Where should I store my token?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              <strong>For web apps:</strong> localStorage or sessionStorage
              <br/><strong>For mobile apps:</strong> Secure storage (Keychain on iOS, Keystore on Android)
              <br/><strong>For desktop/CLI:</strong> Config file with restricted permissions
              <br/>
              <strong>NEVER:</strong> Put tokens in your code or version control!
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: What's the difference between access token and refresh token?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              <strong>Access token:</strong> Short-lived (15 min), used to make API requests
              <br/><strong>Refresh token:</strong> Long-lived (7 days), used to get a new access token
              <br/>
              This two-token approach improves security. If an access token is stolen, 
              it expires quickly and the damage is limited.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: My token expired, what do I do?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              Use your refresh token to get a new access token. Call the /auth/refresh endpoint 
              with your refresh token. If your refresh token is also expired, you'll need to log 
              in again to get new tokens.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Technical Questions
        </h3>

        <div className="space-y-6">
          <div className="border-l-4 border-green-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: What's the difference between GET and POST?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              <strong>GET:</strong> Retrieves data, safe to call multiple times, no data in body
              <br/><strong>POST:</strong> Creates new data, changes server state, data in body
              <br/>
              Simple rule: GET to read, POST to write/create
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: What's JSON and why is it used?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              JSON (JavaScript Object Notation) is a simple format for exchanging data.
              It's human-readable, plays nice with programming languages, and is lightweight.
              Almost all modern APIs use JSON.
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: Should I cache API responses?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              Yes! If the same data isn't changing frequently, cache it locally to:
              <br/>• Reduce API calls (save quota)
              <br/>• Make your app faster (no network delay)
              <br/>• Make it work offline (sometimes)
              <br/>
              Use localStorage or a cache library. Just make sure to invalidate old cache.
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: How do I handle errors in my API calls?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              Always check the status code and handle errors appropriately:
              <br/>• 400-499: Usually client error, fix your request
              <br/>• 500-599: Server error, retry with exponential backoff
              <br/>• Show user-friendly error messages, not raw API errors
              <br/>• Log errors for debugging
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: What's rate limiting and why does it exist?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              Rate limiting restricts how many requests you can make per time period (e.g., 1000 per hour).
              It prevents:
              <br/>• Accidental bugs that spam the API
              <br/>• Malicious users from overloading the server
              <br/>• Fair usage among all users
              <br/>
              If you hit the limit, wait before retrying. Implement exponential backoff.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Security Questions
        </h3>

        <div className="space-y-6">
          <div className="border-l-4 border-orange-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: Is it safe to make API calls from the browser?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              Generally yes, but consider CORS restrictions. Never put sensitive data (passwords, 
              API keys) in frontend code. Use environment variables for sensitive config.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: Should I use HTTPS?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              <strong>ALWAYS yes!</strong> Never send tokens or sensitive data over HTTP.
              HTTPS encrypts everything in transit. Modern browsers will warn you about HTTP APIs.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: Is my API token secret?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              Yes! Never commit it to version control or put it in public code. 
              If someone gets your token, they can make requests as you. If exposed, 
              regenerate it immediately in your account settings.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Debugging Questions
        </h3>

        <div className="space-y-6">
          <div className="border-l-4 border-red-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: How do I debug API calls?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              Use these tools:
              <br/>• Browser DevTools Network tab (see all requests/responses)
              <br/>• Postman (test requests visually)
              <br/>• console.log() (print responses)
              <br/>• API monitoring tools (track calls over time)
              <br/>• Server logs (see what server processed)
            </p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: I get a 404, what does it mean?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              404 means "Not Found" - the resource doesn't exist. Check:
              <br/>• URL is spelled correctly
              <br/>• Resource ID is valid
              <br/>• Endpoint path is right (see documentation)
              <br/>• Resource wasn't deleted
            </p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: I get a 500 error, is it my problem?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              No! 500 means the server has an error, not your request. Try:
              <br/>• Wait a few seconds and retry
              <br/>• Check if the API is down
              <br/>• If it keeps happening, contact API support
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Learning Questions
        </h3>

        <div className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: What should I learn first - APIs or programming?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              You can learn APIs first! Start with Postman (no code). Once comfortable, 
              learn JavaScript or Python to automate API calls. They complement each other.
            </p>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: How should I study this documentation?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              <strong>Don't just read!</strong> Follow the progression:
              <br/>1. Read a section
              <br/>2. Try the examples yourself
              <br/>3. Experiment by modifying the examples
              <br/>4. Build a small project using what you learned
            </p>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4">
            <p className="font-semibold text-slate-900 dark:text-white">
              Q: Should I memorize API details?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              No! Nobody memorizes every detail. Learn how to:
              <br/>• Read the documentation
              <br/>• Understand concepts
              <br/>• Debug problems
              <br/>
              Details are always in the docs. Understanding is what matters.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded mt-8">
          <p className="font-semibold text-blue-900 dark:text-blue-300">
            💡 Didn't find your question?
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
            Check the <a href="/docs/troubleshooting" className="underline hover:text-blue-700 dark:hover:text-blue-200">Troubleshooting Guide</a> for common technical issues,
            or review the documentation sections for your level (Beginner, Intermediate, or Advanced).
          </p>
        </div>
      </Section>
    </div>
  );
}
