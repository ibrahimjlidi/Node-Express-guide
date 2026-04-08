import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Advanced - Performance & Optimization",
  description: "Caching, indexing, and query optimization",
};

export default function PerformancePage() {
  return (
    <div>
      <Section title="Performance Optimization" id="performance">
        <p>
          Every millisecond counts. Learn to optimize API performance at scale.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Database Query Optimization
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          N+1 Query Problem
        </h4>

        <CodeBlock
          code={`// ❌ BAD: N+1 queries
async function getPosts() {
  const posts = await database.query('SELECT * FROM posts');
  
  // This runs 1000 queries if there are 1000 posts!
  for (let post of posts) {
    post.author = await database.query(
      'SELECT * FROM users WHERE id = ?',
      [post.authorId]
    );
  }
  
  return posts;
}

// ✅ GOOD: Join query
async function getPosts() {
  return database.query(\`
    SELECT p.*, u.id, u.name, u.avatar
    FROM posts p
    JOIN users u ON p.authorId = u.id
    LIMIT 50
  \`);
}

// ✅ GOOD: Batch load
async function getPosts() {
  const posts = await database.query('SELECT * FROM posts LIMIT 50');
  const authorIds = posts.map(p => p.authorId);
  
  const authors = await database.query(
    'SELECT * FROM users WHERE id IN (?)',
    [authorIds]
  );
  
  const authorMap = new Map(authors.map(a => [a.id, a]));
  posts.forEach(p => p.author = authorMap.get(p.authorId));
  
  return posts;
}`}
          language="javascript"
          title="N+1 Query Problem"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Database Indexing
        </h4>

        <CodeBlock
          code={`// Create indexes on frequently queried columns
CREATE INDEX idx_posts_authorId ON posts(authorId);
CREATE INDEX idx_posts_createdAt ON posts(createdAt DESC);
CREATE INDEX idx_users_email ON users(email UNIQUE);

// Composite index for queries filtering on multiple columns
CREATE INDEX idx_posts_author_created 
  ON posts(authorId, createdAt DESC);

// Text search index
CREATE FULLTEXT INDEX idx_posts_search 
  ON posts(title, content);

// Query with EXPLAIN to see if index is used
EXPLAIN SELECT * FROM posts WHERE authorId = 123;

// Results show if index is used and row count
-- Using index: idx_posts_authorId
-- Rows examined: 45 (good!)

// Without index: Rows examined: 1000000 (bad!)`}
          language="sql"
          title="Database Indexing"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Caching Strategies
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Redis Caching
        </h4>

        <CodeBlock
          code={`class PostService {
  async getPost(id) {
    // Check cache first
    const cached = await redis.get(\`post:\${id}\`);
    if (cached) return JSON.parse(cached);

    // Cache miss: query database
    const post = await database.posts.findById(id);
    
    // Store in cache for 1 hour
    await redis.setex(
      \`post:\${id}\`,
      3600,
      JSON.stringify(post)
    );

    return post;
  }

  async updatePost(id, data) {
    // Update database
    const post = await database.posts.update(id, data);
    
    // Invalidate cache
    await redis.delete(\`post:\${id}\`);
    
    return post;
  }

  // Cache expensive computations
  async getTrendingPosts() {
    const cached = await redis.get('trending:posts');
    if (cached) return JSON.parse(cached);

    // This query is expensive
    const posts = await database.query(\`
      SELECT p.*, COUNT(l.id) as likeCount
      FROM posts p
      LEFT JOIN likes l ON p.id = l.postId
      WHERE p.createdAt > NOW() - INTERVAL 7 DAY
      GROUP BY p.id
      ORDER BY likeCount DESC
      LIMIT 20
    \`);

    // Cache for 30 minutes (some staleness OK)
    await redis.setex(
      'trending:posts',
      1800,
      JSON.stringify(posts)
    );

    return posts;
  }
}`}
          language="javascript"
          title="Redis Caching"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          HTTP Caching Headers
        </h4>

        <CodeBlock
          code={`// Immutable resources: Cache forever
app.get('/images/:id', (req, res) => {
  res.set({
    'Cache-Control': 'public, max-age=31536000, immutable',
    'ETag': '12345'
  });
  res.sendFile('image.jpg');
});

// Dynamic content: Revalidate daily
app.get('/api/posts/:id', (req, res) => {
  res.set({
    'Cache-Control': 'public, max-age=86400',
    'ETag': generateETag(data)
  });
  res.json(data);
});

// Vary header: Cache different versions for different Accept headers
app.get('/api/posts', (req, res) => {
  res.set({
    'Cache-Control': 'public, max-age=300',
    'Vary': 'Accept, Accept-Encoding'
  });
  res.json(posts);
});

// Private data: Don't cache in CDN, only browser
app.get('/api/user/profile', (req, res) => {
  res.set({
    'Cache-Control': 'private, max-age=3600'
  });
  res.json(userProfile);
});

// Don't cache
app.post('/api/posts', (req, res) => {
  res.set('Cache-Control', 'no-store');
  // Handle request
}):`}
          language="javascript"
          title="HTTP Caching Headers"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Connection Pooling
        </h3>

        <CodeBlock
          code={`// Without pooling: New connection for each request (slow!)
async function getPosts() {
  const connection = await createConnection();
  const posts = await connection.query('SELECT * FROM posts');
  await connection.close();
  return posts;
}

// With pooling: Reuse connections
const pool = new ConnectionPool({
  max: 20,        // Maximum connections
  min: 5,         // Minimum idle connections
  idleTimeoutMs: 30000,
  connectionTimeoutMs: 5000
});

async function getPosts() {
  const connection = await pool.acquire();
  try {
    return await connection.query('SELECT * FROM posts');
  } finally {
    pool.release(connection);
  }
}

// Benefits:
// - Connections are reused (no overhead)
// - Limits total connections (no resource exhaustion)
// - Automatic connection recovery`}
          language="javascript"
          title="Connection Pooling"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Response Optimization
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Pagination for Large Datasets
        </h4>

        <CodeBlock
          code={`// Don't return 1 million records!
// ❌ BAD
GET /api/posts
{ "data": [... 1,000,000 posts ...] }

// ✅ GOOD
GET /api/posts?page=1&limit=20
{
  "data": [... 20 posts ...],
  "pagination": {
    "currentPage": 1,
    "pageSize": 20,
    "totalItems": 1000000,
    "totalPages": 50000
  }
}`}
          language="json"
          title="Pagination"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Field Selection (Sparse Fieldsets)
        </h4>

        <CodeBlock
          code={`// Let clients request only needed fields
GET /api/posts?fields=id,title,authorId

// Response only includes requested fields
[
  { "id": 1, "title": "Post 1", "authorId": 123 },
  { "id": 2, "title": "Post 2", "authorId": 124 }
]

// Implementation
app.get('/api/posts', (req, res) => {
  const { fields } = req.query;
  let posts = await database.posts.find();

  if (fields) {
    const fieldList = fields.split(',');
    posts = posts.map(post => {
      const filtered = {};
      fieldList.forEach(field => {
        filtered[field] = post[field];
      });
      return filtered;
    });
  }

  res.json(posts);
});`}
          language="javascript"
          title="Sparse Fieldsets"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Compression
        </h4>

        <CodeBlock
          code={`// Enable gzip compression
app.use(compression({
  level: 6,  // 1-9, higher = better compression but slower
  threshold: 1024  // Only compress responses > 1KB
}));

// Results:
// Uncompressed: 500KB response
// Compressed: 50KB response (90% reduction!)
// Network time: ~2 seconds → ~0.2 seconds

// Note: Modern APIs always use compression
// Check response headers:
// Content-Encoding: gzip`}
          language="javascript"
          title="Response Compression"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Performance Monitoring
        </h3>

        <CodeBlock
          code={`class PerformanceMonitor {
  static middleware() {
    return (req, res, next) => {
      const startTime = Date.now();

      res.on('finish', () => {
        const duration = Date.now() - startTime;
        
        // Log slow requests
        if (duration > 1000) {
          console.warn(
            \`Slow request: \${req.method} \${req.path} - \${duration}ms\`
          );
        }

        // Send to monitoring service
        this.recordMetric({
          endpoint: req.path,
          method: req.method,
          status: res.statusCode,
          duration,
          timestamp: new Date()
        });
      });

      next();
    };
  }

  static recordMetric(metric) {
    // Send to: Datadog, New Relic, CloudWatch, etc.
    prometheus.histogram('http_request_duration_ms')
      .observe(metric.duration, {
        endpoint: metric.endpoint,
        method: metric.method,
        status: metric.status
      });
  }
}

app.use(PerformanceMonitor.middleware());

// Set up alerts
// Alert if response time > 500ms
// Alert if error rate > 1%
// Alert if database query time > 100ms`}
          language="javascript"
          title="Performance Monitoring"
        />
      </Section>
    </div>
  );
}
