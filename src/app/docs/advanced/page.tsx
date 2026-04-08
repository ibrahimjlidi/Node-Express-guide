import { Section } from "@/components";

export const metadata = {
  title: "Advanced Level - Professional APIs",
  description: "Advanced API architecture, security, and scaling",
};

export default function AdvancedLevelPage() {
  return (
    <div>
      <Section title="Advanced Level" id="advanced-level">
        <p>
          Welcome to Advanced. At this level, you're building production systems at scale.
          We cover architecture decisions, security vulnerabilities, performance optimization,
          and deployment strategies.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What You'll Learn Here
        </h3>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-slate-50 dark:bg-slate-900/20 p-4 rounded-lg border border-slate-300 dark:border-slate-700">
            <div className="font-semibold text-slate-900 dark:text-slate-300">
              🏗️ Backend Architecture
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-400 mt-2">
              MVC, N-tier, microservices, CQRS patterns and when to use each
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/20 p-4 rounded-lg border border-slate-300 dark:border-slate-700">
            <div className="font-semibold text-slate-900 dark:text-slate-300">
              🔐 Advanced Security
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-400 mt-2">
              OAuth 2.0, 2FA, API keys, OWASP top 10, secure token storage
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/20 p-4 rounded-lg border border-slate-300 dark:border-slate-700">
            <div className="font-semibold text-slate-900 dark:text-slate-300">
              ⚡ Performance Optimization
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-400 mt-2">
              Caching, indexing, connection pooling, query optimization, monitoring
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/20 p-4 rounded-lg border border-slate-300 dark:border-slate-700">
            <div className="font-semibold text-slate-900 dark:text-slate-300">
              📈 Scaling & Deployment
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-400 mt-2">
              Horizontal scaling, load balancing, containerization, Kubernetes, CI/CD
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Prerequisites
        </h3>

        <p>
          You should be comfortable with:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Building and deploying production APIs</li>
          <li>Working with databases and SQL</li>
          <li>Authentication and user management</li>
          <li>Error handling and debugging</li>
          <li>Testing and code quality</li>
          <li>version control with Git</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Required Tools & Knowledge
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Docker</strong> - Containerization basics</li>
          <li><strong>HTTPS/TLS</strong> - How encryption works</li>
          <li><strong>Databases</strong> - SQL optimization, indexing, replication</li>
          <li><strong>Caching</strong> - Redis or Memcached</li>
          <li><strong>Monitoring</strong> - Prometheus, ELK, or similar</li>
          <li><strong>CI/CD</strong> - GitHub Actions, Jenkins, or GitLab CI</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Learning Path
        </h3>

        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <a href="/docs/advanced/architecture" className="text-blue-600 dark:text-blue-400 hover:underline">
              Backend Architecture
            </a> - Learn architectural patterns and when to use them
          </li>
          <li>
            <a href="/docs/advanced/advanced-auth" className="text-blue-600 dark:text-blue-400 hover:underline">
              Advanced Authentication
            </a> - OAuth 2.0, 2FA, secure token management
          </li>
          <li>
            <a href="/docs/advanced/performance" className="text-blue-600 dark:text-blue-400 hover:underline">
              Performance Optimization
            </a> - Make your API fast at scale
          </li>
          <li>
            <a href="/docs/advanced/security" className="text-blue-600 dark:text-blue-400 hover:underline">
              Security Best Practices
            </a> - Protect against common vulnerabilities
          </li>
          <li>
            <a href="/docs/advanced/scaling" className="text-blue-600 dark:text-blue-400 hover:underline">
              Scaling & Deployment
            </a> - Deploy to production at scale
          </li>
        </ol>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Common Scenarios You'll Handle
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>API is slow - how to optimize?</li>
          <li>Database is the bottleneck - indexing or scaling?</li>
          <li>Need to support 1 million concurrent users</li>
          <li>Security breach - how to respond?</li>
          <li>How to deploy safely without downtime?</li>
          <li>Debugging production issues in real-time</li>
          <li>Cost optimization at scale</li>
          <li>Geographic distribution and CDNs</li>
        </ul>

        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded mt-8">
          <p className="font-semibold text-amber-900 dark:text-amber-300">
            ⚠️ Important
          </p>
          <p className="text-sm text-amber-800 dark:text-amber-200 mt-2">
            Advanced content assumes production experience. These decisions affect reliability,
            security, and cost. Take time to understand the tradeoffs before implementing.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded mt-4">
          <p className="font-semibold text-green-900 dark:text-green-300">
            ✅ You're Ready When
          </p>
          <p className="text-sm text-green-800 dark:text-green-200 mt-2">
            You understand why each decision matters, can explain tradeoffs, and can implement solutions.
          </p>
        </div>
      </Section>
    </div>
  );
}
