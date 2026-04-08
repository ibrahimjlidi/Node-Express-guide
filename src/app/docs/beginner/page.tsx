import { Section } from "@/components";

export const metadata = {
  title: "Beginner Level - API Fundamentals",
  description: "Learn the basics of APIs from scratch",
};

export default function BeginnerLevelPage() {
  return (
    <div>
      <Section title="Beginner Level" id="beginner-level">
        <p>
          Welcome! If you're brand new to APIs, this is the perfect place to start.
          We'll explain complex concepts in simple terms with lots of examples.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What is an API?
        </h3>

        <p>
          Think of an API like a restaurant menu. You (the customer) don't go into the kitchen.
          Instead, you tell the waiter what you want, they go to the kitchen and bring
          back your food. The API is the waiter!
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded my-4">
          <p className="font-semibold text-blue-900 dark:text-blue-300">
            API = Communication Interface
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
            You make requests → API processes them → You get responses back
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What You'll Learn
        </h3>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="font-semibold text-green-900 dark:text-green-300">
              🤔 What is an API?
            </div>
            <p className="text-sm text-green-800 dark:text-green-200 mt-2">
              Start from the absolute beginning - no assumptions!
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="font-semibold text-purple-900 dark:text-purple-300">
              💻 Your First Request
            </div>
            <p className="text-sm text-purple-800 dark:text-purple-200 mt-2">
              Make your first API call in 5 minutes from your terminal
            </p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="font-semibold text-orange-900 dark:text-orange-300">
              📚 Basic Concepts
            </div>
            <p className="text-sm text-orange-800 dark:text-orange-200 mt-2">
              HTTP, URLs, JSON, requests, responses - all explained clearly
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <div className="font-semibold text-red-900 dark:text-red-300">
              🔍 Ready to Explore
            </div>
            <p className="text-sm text-red-800 dark:text-red-200 mt-2">
              Browse real API examples and understand what they do
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          No Prerequisites
        </h3>

        <p>
          You don't need:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Programming experience</li>
          <li>Knowledge of web development</li>
          <li>A powerful computer</li>
          <li>To install anything (yet)</li>
        </ul>

        <p className="mt-4">
          Just bring curiosity and a browser!
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Your Learning Path
        </h3>

        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <a href="/docs/beginner/what-is-api" className="text-blue-600 dark:text-blue-400 hover:underline">
              What is an API?
            </a> - Start here! (5 min read)
          </li>
          <li>
            <a href="/docs/beginner/first-request" className="text-blue-600 dark:text-blue-400 hover:underline">
              Your First Request
            </a> - Make your first API call (10 min)
          </li>
          <li>
            <a href="/docs/beginner/basic-concepts" className="text-blue-600 dark:text-blue-400 hover:underline">
              Basic Concepts
            </a> - Understand the building blocks (15 min)
          </li>
          <li>Ready for intermediate? Read more tutorials and examples!</li>
        </ol>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Fun Fact
        </h3>

        <p>
          APIs power everything on the internet:
        </p>

        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>When you scroll Instagram, an API fetches new photos</li>
          <li>When you order food on DoorDash, APIs communicate with restaurants</li>
          <li>When you check weather, an API gets data from weather stations</li>
          <li>When you message someone, APIs deliver your messages</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded mt-8">
          <p className="font-semibold text-blue-900 dark:text-blue-300">
            💡 Pro Tip
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
            Don't skip the basics! Understanding these fundamentals will make advanced concepts much easier. Take your time - this isn't a race.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded mt-4">
          <p className="font-semibold text-green-900 dark:text-green-300">
            ✅ Next Step
          </p>
          <p className="text-sm text-green-800 dark:text-green-200 mt-2">
            Ready to begin? Click on "What is an API?" below to get started! 🚀
          </p>
        </div>
      </Section>
    </div>
  );
}
