import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Advanced - Security Best Practices",
  description: "OWASP vulnerabilities, input validation, data protection",
};

export default function SecurityPage() {
  return (
    <div>
      <Section title="Security Best Practices" id="security">
        <p>
          Security is not optional. Learn to protect your API and users' data.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          OWASP Top 10 API Vulnerabilities
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          1. SQL Injection
        </h4>

        <CodeBlock
          code={`// ❌ VULNERABLE to SQL injection
GET /api/posts?id=123 OR 1=1
const query = \`SELECT * FROM posts WHERE id = \${req.query.id}\`;

// ✅ SAFE: Use parameterized queries
const post = await database.query(
  'SELECT * FROM posts WHERE id = ?',
  [req.query.id]
);

// ✅ SAFE: Use ORM (Sequelize, TypeORM)
const post = await Post.findById(req.query.id);`}
          language="javascript"
          title="SQL Injection Prevention"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          2. Broken Authentication
        </h4>

        <CodeBlock
          code={`// ❌ VULNERABLE
// Weak password requirements
app.post('/auth/register', (req, res) => {
  if (req.body.password.length < 4) { // Too weak!
    throw new Error('Password too short');
  }
});

// Passwords stored in plain text
user.password = req.body.password; // Never do this!

// Long-lived tokens
const token = jwt.sign(userId, { expiresIn: '365d' }); // Way too long!

// ✅ SECURE
// Strong password requirements
const rules = {
  minLength: 12,
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumbers: /[0-9]/,
  hasSymbols: /[!@#$%^&*]/
};

// Password hashing with salt
const hash = await bcrypt.hash(password, 10);
user.password = hash;

// Verify password
const isValid = await bcrypt.compare(inputPassword, user.password);

// Short-lived tokens
const token = jwt.sign(userId, { expiresIn: '15m' });
const refreshToken = jwt.sign(userId, { expiresIn: '7d' });`}
          language="javascript"
          title="Authentication Security"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          3. Sensitive Data Exposure
        </h4>

        <CodeBlock
          code={`// ❌ VULNERABLE: Logging sensitive data
console.log('User login:', { email, password }); // Don't log passwords!

// ❌ VULNERABLE: Returning too much data
app.get('/api/users/:id', (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user); // Returns password hash, salt, etc!
});

// ❌ VULNERABLE: HTTP instead of HTTPS
const apiUrl = 'http://api.example.com'; // Never!

// ✅ SECURE: Only log non-sensitive data
console.log('User login:', { email, timestamp: Date.now() });

// ✅ SECURE: Only return needed fields
app.get('/api/users/:id', (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({
    id: user.id,
    name: user.name,
    avatar: user.avatar
    // password, salt, etc. are NOT included
  });
});

// ✅ SECURE: Always use HTTPS
const apiUrl = 'https://api.example.com'; // Good!

// ✅ SECURE: Encrypt sensitive data
const encrypted = crypto.encrypt(ssn, encryptionKey);
database.users.save({ ssn: encrypted });`}
          language="javascript"
          title="Data Protection"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          4. Input Validation
        </h4>

        <CodeBlock
          code={`class InputValidator {
  static validateEmail(email) {
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!re.test(email)) {
      throw new Error('Invalid email');
    }
    return true;
  }

  static validatePassword(password) {
    if (password.length < 12) throw new Error('Too short');
    if (!/[A-Z]/.test(password)) throw new Error('Need uppercase');
    if (!/[0-9]/.test(password)) throw new Error('Need number');
    if (!/[!@#$%^&*]/.test(password)) throw new Error('Need symbol');
    return true;
  }

  static sanitizeInput(input) {
    // Remove potentially dangerous characters
    return input
      .trim()
      .replace(/[<>\"'&]/g, char => {
        const map = { '<': '&lt;', '>': '&gt;', '\"': '&quot;',
                      \"'\": '&#x27;', '&': '&amp;' };
        return map[char];
      });
  }

  static validateRequest(req, schema) {
    // Use a validation library like Joi or yup
    const { error, value } = schema.validate(req.body);
    if (error) throw new Error(error.details[0].message);
    return value;
  }
}

// Usage
const { Joi } = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(12).required(),
  name: Joi.string().min(2).max(100).required()
});

app.post('/auth/register', (req, res) => {
  const validated = InputValidator.validateRequest(req, registerSchema);
  // Process validated data
});`}
          language="javascript"
          title="Input Validation"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          5. Authorization Issues
        </h4>

        <CodeBlock
          code={`// ❌ VULNERABLE: Trusting client-provided ID
GET /api/users/123/posts
// Client could request: /api/users/456/posts and get someone else's posts!

app.get('/api/users/:userId/posts', (req, res) => {
  const posts = await Post.find({ authorId: req.params.userId });
  res.json(posts);
});

// ✅ SECURE: Check current user's authorization
app.get('/api/users/:userId/posts', (req, res) => {
  // Verify the requested userId matches authenticated user
  if (req.user.id !== parseInt(req.params.userId)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const posts = await Post.find({ authorId: req.user.id });
  res.json(posts);
});

// ✅ SECURE: Use role-based access control (RBAC)
function authorize(...requiredRoles) {
  return (req, res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

// Usage
app.delete('/api/users/:id', 
  authorize('admin'),
  (req, res) => {
    // Only admins can delete users
  }
);

// ✅ SECURE: Resource-level authorization
app.put('/api/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  // Check if user owns the post
  if (post.authorId !== req.user.id) {
    return res.status(403).json({ error: 'Cannot edit others\\' posts' });
  }

  post.update(req.body);
});`}
          language="javascript"
          title="Authorization (Broken Access Control)"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Rate Limiting & DDoS Protection
        </h3>

        <CodeBlock
          code={`const rateLimit = require('express-rate-limit');

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // 100 requests per windowMs
  message: 'Too many requests from this IP',
  skip: (req) => req.user?.isAdmin, // Skip for admins
  keyGenerator: (req) => req.user?.id || req.ip // By user ID or IP
});

// Strict rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 attempts per 15 minutes
  skipSuccessfulRequests: true // Don't count successful attempts
});

app.post('/auth/login', authLimiter, (req, res) => {
  // Handle login
});

app.use('/api/', apiLimiter);

// Store rate limit data in Redis for distributed systems
const RedisStore = require('rate-limit-redis');
const redis = require('redis');
const client = redis.createClient();

const limiter = rateLimit({
  store: new RedisStore({
    client,
    prefix: 'rate-limit:'
  }),
  windowMs: 15 * 60 * 1000,
  max: 100
});`}
          language="javascript"
          title="Rate Limiting"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          CORS & HTTP Headers
        </h3>

        <CodeBlock
          code={`const cors = require('cors');

// Configure CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://app.example.com']
    : ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Security headers
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Content Security Policy
  res.setHeader('Content-Security-Policy', \`
    default-src 'self';
    script-src 'self' 'unsafe-inline' *.example.com;
    style-src 'self' 'unsafe-inline';
  \`);

  // HSTS (force HTTPS)
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  next();
});`}
          language="javascript"
          title="CORS and Security Headers"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Security Checklist
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>Use HTTPS everywhere (never HTTP)</li>
          <li>Hash passwords with bcrypt or similar</li>
          <li>Use short-lived JWT access tokens (15-30 min)</li>
          <li>Implement 2FA for sensitive operations</li>
          <li>Validate and sanitize all input</li>
          <li>Use parameterized queries (prevent SQL injection)</li>
          <li>Check authorization on every endpoint</li>
          <li>Implement rate limiting</li>
          <li>Enable CORS correctly</li>
          <li>Set security headers (CSP, HSTS, X-Frame-Options)</li>
          <li>Never log sensitive data</li>
          <li>Encrypt sensitive data at rest</li>
          <li>Use environment variables for secrets</li>
          <li>Keep dependencies updated</li>
          <li>Run security audits and penetration testing</li>
          <li>Monitor for suspicious activity</li>
          <li>Have incident response plan</li>
        </ul>
      </Section>
    </div>
  );
}
